import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".xml": "application/xml", ".txt": "text/plain", ".webmanifest": "application/manifest+json" };

createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  const relative = normalize(decodeURIComponent(pathname)).replace(/^[/\\]+/, "");
  const target = join(root, relative || "index.html");
  if (!target.startsWith(root)) {
    response.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(target);
    response.writeHead(200, { "content-type": `${types[extname(target)] ?? "application/octet-stream"}; charset=utf-8` }).end(body);
  } catch {
    response.writeHead(404, { "content-type": "text/html; charset=utf-8" }).end(await readFile(join(root, "404.html")));
  }
}).listen(4173, "127.0.0.1", () => console.log("Local: http://127.0.0.1:4173/"));
