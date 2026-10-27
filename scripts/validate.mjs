import { readFile, readdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const mode = process.argv[2] ?? "source";
if (!["source", "dist"].includes(mode)) throw new Error("Expected source or dist");

const root = mode === "dist" ? join(projectRoot, "dist") : projectRoot;
const read = (path) => readFile(join(root, path), "utf8");
const expect = (condition, message) => {
  if (!condition) throw new Error(message);
};
const files = ["index.html", "impressum.html", "datenschutz.html", "404.html", "robots.txt", "sitemap.xml", "site.webmanifest", ".htaccess"];
const contentPath = mode === "dist" ? "" : "public/";

for (const file of files) {
  const location = join(root, file.endsWith(".html") ? file : contentPath + file);
  expect((await stat(location)).isFile(), `Missing ${file}`);
}

const home = await read("index.html");
const imprint = await read("impressum.html");
const privacy = await read("datenschutz.html");
const htaccess = await read(contentPath + ".htaccess");
const robots = await read(contentPath + "robots.txt");
const sitemap = await read(contentPath + "sitemap.xml");

expect(home.includes('<html lang="de-DE">'), "German document language missing");
expect(home.includes('data-site="byangama-portfolio"'), "Portfolio marker missing");
expect(home.includes('https://byangama.de/'), "Canonical URL missing");
expect(home.includes('data-page="home"'), "Vue homepage mount missing");
expect(imprint.includes('data-page="impressum"') && imprint.includes('content="noindex, follow"'), "Imprint entry missing");
expect(privacy.includes('data-page="datenschutz"') && privacy.includes('content="noindex, follow"'), "Privacy entry missing");
expect(htaccess.includes("Content-Security-Policy") && htaccess.includes("Strict-Transport-Security"), "Security headers missing");
expect(robots.includes("Sitemap: https://byangama.de/sitemap.xml"), "Robots sitemap missing");
expect(sitemap.includes("<loc>https://byangama.de/</loc>"), "Homepage sitemap entry missing");

if (mode === "source") {
  const app = await read("src/App.vue");
  const homeView = await read("src/views/HomeView.vue");
  const legalView = await read("src/views/LegalView.vue");
  const content = await read("src/content.ts");
  expect(app.includes('href="/impressum.html"') && app.includes('href="/datenschutz.html"'), "Legal navigation missing");
  expect(homeView.includes("v-for=\"project in projects\"") && homeView.includes("v-for=\"profile in profiles\""), "Vue content lists missing");
  expect(legalView.includes("noch unvollständig"), "Legal placeholder warning missing");
  for (const url of ["https://pokedex.byangama.de/", "https://app.byangama.de/", "https://www.twitch.tv/angama666"]) {
    expect(content.includes(url), `Missing public link ${url}`);
  }
} else {
  const entries = await readdir(join(root, "assets"));
  expect(entries.some((file) => /^main-[\w-]+\.js$/u.test(file)), "Vite JavaScript bundle missing");
  expect(entries.some((file) => /^main-[\w-]+\.css$/u.test(file)), "Vite CSS bundle missing");
  for (const page of [home, imprint, privacy]) {
    expect(/\/assets\/main-[\w-]+\.js/u.test(page), "Page does not load the Vue bundle");
  }
  expect(!(await readdir(root)).some((file) => file.endsWith(".map")), "Source map in public output");
}

console.log(`Portfolio ${mode} validation passed`);
