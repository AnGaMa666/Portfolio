import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(scriptDirectory, "../src");
const root = path.resolve(process.argv[2] ?? defaultRoot);

const fail = (message) => {
  throw new Error(message);
};

const assert = (condition, message) => {
  if (!condition) fail(message);
};

const readText = async (relativePath) => {
  const absolutePath = path.join(root, relativePath);
  return readFile(absolutePath, "utf8");
};

const collectFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absolutePath)));
    } else {
      files.push(absolutePath);
    }
  }

  return files;
};

const requiredFiles = [
  "index.html",
  "404.html",
  "impressum.html",
  "datenschutz.html",
  "portfolio.css",
  "portfolio.js",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  ".htaccess"
];

for (const file of requiredFiles) {
  const fileStats = await stat(path.join(root, file));
  assert(fileStats.isFile(), `${file} fehlt oder ist keine Datei.`);
}

const html = await readText("index.html");
const notFoundHtml = await readText("404.html");
const imprintHtml = await readText("impressum.html");
const privacyHtml = await readText("datenschutz.html");
const robots = await readText("robots.txt");
const sitemap = await readText("sitemap.xml");
const htaccess = await readText(".htaccess");
const manifestText = await readText("site.webmanifest");
const styles = await readText("portfolio.css");
const script = await readText("portfolio.js");
const isProductionBuild = root.includes(`${path.sep}dist`) || path.basename(root) === "dist";

assert(!html.includes("http://"), "Die Startseite enthält eine unsichere HTTP-URL.");
assert(html.includes('<html lang="de-DE">'), "Die Seitensprache de-DE fehlt.");
assert(html.includes('<link rel="canonical" href="https://byangama.de/"'), "Der Canonical-Link fehlt.");
assert(
  html.includes('content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"'),
  "Die indexierbare Robots-Angabe fehlt."
);
assert(html.includes('data-site="byangama-portfolio"'), "Die Portfolio-Kennung fehlt.");
assert(html.includes("https://pokedex.byangama.de/"), "Der Pokédex-Link fehlt.");
assert(html.includes('<meta name="author" content="AnGaMa" />'), "Der öffentliche Autorname fehlt.");
assert(html.includes("AnGaMa666"), "Der öffentliche AnGaMa666-Name fehlt.");
assert(!html.includes('profile:first_name'), "Ein öffentlicher Vorname darf nicht als Profil-Metadatum ausgegeben werden.");
assert(!html.includes('profile:last_name'), "Ein öffentlicher Nachname darf nicht als Profil-Metadatum ausgegeben werden.");
assert(html.includes('href="/impressum.html"'), "Der Impressum-Link fehlt.");
assert(html.includes('href="/datenschutz.html"'), "Der Datenschutz-Link fehlt.");
assert(html.includes("https://app.byangama.de/"), "Der SMMC-Link fehlt.");
assert(imprintHtml.includes("noch unvollständig"), "Das unvollständige Impressum muss gekennzeichnet sein.");
assert(privacyHtml.includes("noch unvollständig"), "Die unvollständige Datenschutzseite muss gekennzeichnet sein.");
assert(!html.includes("angama-portrait"), "Ein nicht vorhandenes Porträt darf nicht beworben werden.");
assert(styles.includes("@media(max-width:600px)"), "Das mobile Layout fehlt.");
assert(script.includes("data-current-year"), "Die Jahreszahl-Funktion fehlt.");
if (isProductionBuild) {
  const versionedStyle = /href="\/portfolio\.css\?v=[a-f0-9]{12}"/u;
  const versionedScript = /src="\/portfolio\.js\?v=[a-f0-9]{12}"/u;
  assert(versionedStyle.test(html), "Der Produktionsbuild benötigt eine versionierte CSS-URL.");
  assert(versionedScript.test(html), "Der Produktionsbuild benötigt eine versionierte JavaScript-URL.");
  assert(versionedStyle.test(notFoundHtml), "Die 404-Seite benötigt eine versionierte CSS-URL.");
  assert(versionedScript.test(notFoundHtml), "Die 404-Seite benötigt eine versionierte JavaScript-URL.");
  for (const [page, source] of [["Impressum", imprintHtml], ["Datenschutz", privacyHtml]]) {
    assert(versionedStyle.test(source), `${page} benötigt eine versionierte CSS-URL.`);
    assert(versionedScript.test(source), `${page} benötigt eine versionierte JavaScript-URL.`);
  }
}

const h1Count = (html.match(/<h1\b/gu) ?? []).length;
assert(h1Count === 1, `Die Startseite muss genau eine H1 enthalten, gefunden: ${h1Count}.`);

const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/u);
assert(jsonLdMatch, "Strukturierte JSON-LD-Daten fehlen.");
const structuredData = JSON.parse(jsonLdMatch[1]);
assert(Array.isArray(structuredData["@graph"]), "JSON-LD enthält keinen @graph.");

const person = structuredData["@graph"].find((entry) => entry["@type"] === "Person");
assert(person, "Die strukturierte Person fehlt.");
assert(person.name === "AnGaMa", "In den Person-Daten darf nur der öffentliche Name AnGaMa stehen.");
assert(Array.isArray(person.alternateName) && person.alternateName.includes("AnGaMa666"), "Der öffentliche Alternativname fehlt.");
assert(Array.isArray(person.sameAs) && person.sameAs.length === 5, "Die offiziellen Profile in sameAs sind unvollständig.");

const expectedProfiles = [
  "https://www.twitch.tv/angama666",
  "https://www.tiktok.com/@angamavt",
  "https://www.instagram.com/angama666/",
  "https://x.com/AnGaMa666",
  "https://github.com/AnGaMa666"
];
for (const profile of expectedProfiles) {
  assert(person.sameAs.includes(profile), `Das offizielle Profil fehlt in JSON-LD: ${profile}`);
}

const blankTargetLinks = html.match(/<a\b[^>]*target="_blank"[^>]*>/gu) ?? [];
for (const link of blankTargetLinks) {
  assert(/rel="[^"]*noopener[^"]*"/u.test(link), `Externer Link ohne noopener: ${link}`);
  assert(/rel="[^"]*noreferrer[^"]*"/u.test(link), `Externer Link ohne noreferrer: ${link}`);
}

assert(notFoundHtml.includes('content="noindex, follow"'), "Die 404-Seite muss noindex verwenden.");
assert(imprintHtml.includes('content="noindex, follow"'), "Das unvollständige Impressum muss noindex verwenden.");
assert(privacyHtml.includes('content="noindex, follow"'), "Die unvollständige Datenschutzseite muss noindex verwenden.");
assert(robots.includes("User-agent: *"), "robots.txt enthält keinen allgemeinen User-Agent.");
assert(robots.includes("Allow: /"), "robots.txt erlaubt die Website nicht vollständig.");
assert(robots.includes("Sitemap: https://byangama.de/sitemap.xml"), "robots.txt verweist nicht auf die Sitemap.");
assert(sitemap.includes("<loc>https://byangama.de/</loc>"), "Die Startseite fehlt in sitemap.xml.");
assert(!sitemap.includes("http://byangama.de"), "Die Sitemap enthält eine unsichere Domain-URL.");
assert(htaccess.includes("Content-Security-Policy"), "Der Content-Security-Policy-Header fehlt.");
assert(htaccess.includes("Strict-Transport-Security"), "Der HSTS-Header fehlt.");
assert(htaccess.includes('X-Robots-Tag "index, follow, max-image-preview:large"'), "Der indexierbare X-Robots-Tag fehlt.");

const manifest = JSON.parse(manifestText);
assert(manifest.name === "AnGaMa – Portfolio", "Der Manifest-Name ist falsch.");
assert(manifest.description === "Offizielle Portfolio-Seite von AnGaMa.", "Die Manifest-Beschreibung ist falsch.");
assert(manifest.start_url === "/", "Die Manifest-Start-URL ist falsch.");

const publicFiles = await collectFiles(root);
for (const file of publicFiles) {
  const relativePath = path.relative(root, file);
  assert(!relativePath.endsWith(".map"), `Source Map darf nicht veröffentlicht werden: ${relativePath}`);
  if (isProductionBuild) {
    assert(!relativePath.endsWith(".md"), `Markdown darf nicht im Build liegen: ${relativePath}`);
  }
}

console.log(`Portfolio validation passed for ${root}`);
