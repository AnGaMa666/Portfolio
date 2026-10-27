import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const appDirectory = path.resolve(scriptDirectory, "..");
const sourceDirectory = path.join(appDirectory, "src");
const outputDirectory = path.join(appDirectory, "dist");
const validationScript = path.join(scriptDirectory, "validate.mjs");

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(sourceDirectory, outputDirectory, {
  recursive: true,
  filter(source) {
    return !["UPLOAD.md", ".DS_Store"].includes(path.basename(source));
  }
});

const revision = async (relativePath) =>
  createHash("sha256")
    .update(await readFile(path.join(outputDirectory, relativePath)))
    .digest("hex")
    .slice(0, 12);

const cssRevision = await revision("portfolio.css");
const scriptRevision = await revision("portfolio.js");
for (const page of ["index.html", "404.html", "impressum.html", "datenschutz.html"]) {
  const pagePath = path.join(outputDirectory, page);
  const source = await readFile(pagePath, "utf8");
  const output = source
    .replace('href="/portfolio.css"', `href="/portfolio.css?v=${cssRevision}"`)
    .replace('src="/portfolio.js"', `src="/portfolio.js?v=${scriptRevision}"`);
  if (output === source) {
    throw new Error(`Cache-Busting konnte in ${page} nicht angewendet werden.`);
  }
  await writeFile(pagePath, output, "utf8");
}

const validation = spawnSync(process.execPath, [validationScript, outputDirectory], {
  cwd: appDirectory,
  stdio: "inherit"
});

if (validation.status !== 0) {
  process.exit(validation.status ?? 1);
}

console.log(`Portfolio build created at ${outputDirectory}`);
