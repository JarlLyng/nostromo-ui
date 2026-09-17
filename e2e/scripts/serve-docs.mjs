#!/usr/bin/env node
/**
 * Serve the documentation site's production export for the browser tests.
 *
 * Two details this exists for.
 *
 * The export is built with `basePath: "/nostromo-ui"`, because that is where
 * GitHub Pages serves it. Every stylesheet, script and image in the built HTML
 * is therefore requested under that prefix, and serving `docs/out` at the root
 * answers 404 to all of them - the page renders unstyled and every assertion
 * about a colour passes or fails for the wrong reason. So the root handed to the
 * server is the directory *above* the export, with the export mounted at the
 * prefix it expects.
 *
 * And it builds the export when it is missing rather than skipping the tests.
 * The bug these tests guard against was a theme switcher that silently did
 * nothing; a test suite that silently does not run is the same failure wearing a
 * different hat.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createReadStream, statSync } from "node:fs";

const port = Number(process.argv[2] ?? 4320);
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const docsDir = join(repoRoot, "docs");
const out = join(docsDir, "out");
const BASE_PATH = "/nostromo-ui";

if (!existsSync(join(out, "index.html"))) {
  console.log("docs/out is missing - building the documentation export...");
  execFileSync("pnpm", ["--filter", "nostromo-ui-docs", "build"], {
    cwd: repoRoot,
    stdio: "inherit",
  });
}

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  let path = decodeURIComponent(url.pathname);

  if (!path.startsWith(BASE_PATH)) {
    res.writeHead(404).end("Not found");
    return;
  }
  path = path.slice(BASE_PATH.length) || "/";

  // `normalize` before joining, so an encoded `..` cannot walk out of the export.
  let file = join(out, normalize(path).replace(/^(\.\.[/\\])+/, ""));
  if (!file.startsWith(out)) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  if (existsSync(file) && statSync(file).isDirectory()) {
    file = join(file, "index.html");
  }
  if (!existsSync(file) && existsSync(`${file}.html`)) {
    file = `${file}.html`;
  }
  if (!existsSync(file)) {
    res.writeHead(404, { "content-type": "text/plain" }).end("Not found");
    return;
  }

  res.writeHead(200, {
    "content-type": TYPES[extname(file)] ?? "application/octet-stream",
  });
  createReadStream(file).pipe(res);
}).listen(port, () => {
  console.log(`docs export served at http://localhost:${port}${BASE_PATH}/`);
});
