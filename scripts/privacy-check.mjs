import { readFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const monorepo = existsSync(resolve(root, "../../apps/web/src/App.vue"));
const repo = monorepo ? resolve(root, "../..") : root;
const portfolioPath = monorepo ? "apps/portfolio/" : "";
const strict = process.argv.includes("--strict");
const live = process.argv.includes("--live");
const problems = [];
const risks = [];
const read = async (path) => readFile(resolve(repo, path), "utf8");

async function sourceFiles(directory) {
  const result = [];
  for (const name of await readdir(directory)) {
    const full = join(directory, name);
    const item = await stat(full);
    if (item.isDirectory()) result.push(...await sourceFiles(full));
    else if (/\.(vue|ts|css|html)$/.test(name) && !/\.(?:spec|test)\.ts$/.test(name)) result.push(full);
  }
  return result;
}

const legal = await read(`${portfolioPath}src/views/LegalView.vue`);
const layout = await read(`${portfolioPath}src/App.vue`);
const webLayout = monorepo ? await read("apps/web/src/App.vue") : null;
const consent = monorepo ? await read("apps/web/src/components/privacy/CookieConsent.vue") : null;
const connections = monorepo ? await read("apps/web/src/views/ConnectionsView.vue") : null;
const portfolioFiles = await sourceFiles(resolve(root, "src"));
const webFiles = monorepo ? await sourceFiles(resolve(repo, "apps/web/src")) : [];
const source = await Promise.all([...portfolioFiles, ...webFiles].map(async file => [file, await readFile(file, "utf8")]));

for (const route of ["impressum", "datenschutz", "nutzungsbedingungen", "datenloeschung"]) {
  if (!layout.includes(`href="/${route}"`) || (webLayout && !webLayout.includes(`https://byangama.de/${route}`)))
    problems.push(`Rechtslink fehlt: ${route}`);
}
if (!legal.includes("privacy-explainer.webm") || !legal.includes("privacy-explainer-de.vtt") ||
    !legal.includes("Textfassung des Videos")) problems.push("Datenschutzvideo, Untertitel oder Textfassung fehlen.");
for (const asset of ["privacy-explainer.webm", "privacy-explainer-de.vtt"]) {
  if (!(await stat(resolve(root, "public", asset))).isFile()) problems.push(`Datenschutzmedium fehlt: ${asset}`);
}
if (monorepo && (!consent.includes("Nur notwendige") || !consent.includes("Twitch-Chat") ||
    !connections.includes("showChat && cookieConsent.twitch"))) problems.push("Optionale Twitch-Einbettung ist nicht klar an die Zustimmung gebunden.");

for (const [file, contents] of source) {
  const path = file.slice(repo.length + 1).replaceAll("\\", "/");
  if (/fonts\.googleapis\.com|fonts\.gstatic\.com|googletagmanager\.com|google-analytics\.com|connect\.facebook\.net\/.*fbevents/i.test(contents))
    problems.push(`Externe Schrift oder Tracking-Code prüfen: ${path}`);
  for (const tag of contents.matchAll(/<img\b[^>]*>/gs)) {
    if (!/(?:\s|:)alt\s*=/.test(tag[0])) problems.push(`Bild ohne Alt-Attribut: ${path}`);
  }
}

const placeholders = legal.match(/\[(?:DEINE ANGABE|PRÜFEN):[^\]]+\]/g) || [];
if (placeholders.length) risks.push(`${placeholders.length} offene Angaben in den Rechtstexten; Impressum und Datenschutz sind nicht freigabefertig.`);
risks.push("Server-Logs, Auftragsverarbeitung, Backups, Bildrechte und tatsächliche Drittlandflüsse müssen extern belegt werden.");
risks.push("Kontrast, Tastaturbedienung und Screenreader-Verhalten brauchen zusätzlich einen manuellen Test im Browser.");

if (live) {
  for (const url of ["https://byangama.de/impressum", "https://byangama.de/datenschutz",
    "https://byangama.de/nutzungsbedingungen", "https://byangama.de/datenloeschung", "https://app.byangama.de/login"]) {
    try {
      const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(10_000) });
      if (!response.ok) problems.push(`Öffentliche Seite antwortet mit ${response.status}: ${url}`);
      if (!response.headers.has("content-security-policy")) risks.push(`CSP-Header nicht sichtbar: ${url}`);
      console.log(`${response.status} ${url}`);
    } catch { problems.push(`Öffentliche Seite nicht erreichbar: ${url}`); }
  }
}

console.log(`Technische Prüfungen: ${problems.length ? "FEHLER" : "OK"}`);
for (const item of problems) console.log(`FEHLER: ${item}`);
for (const item of risks) console.log(`OFFEN: ${item}`);
if (problems.length || (strict && risks.length)) process.exitCode = 1;
