#!/usr/bin/env node
// Generates a static SPA index.html into dist/client based on Vite's manifest.
// Used when serving the app behind a plain Node static server (EasyPanel).
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = resolve(__dirname, "..");
const clientRoot = resolve(projectRoot, "dist/client");
const manifestPath = resolve(clientRoot, ".vite/manifest.json");
const indexPath = resolve(clientRoot, "index.html");

if (!existsSync(manifestPath)) {
  console.error(`[generate-shell] manifest not found at ${manifestPath}`);
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

// Find the entry chunk (isEntry === true)
const entry = Object.values(manifest).find((c) => c && c.isEntry);
if (!entry) {
  console.error("[generate-shell] no entry chunk found in manifest");
  process.exit(1);
}

const collectedJs = new Set();
const collectedCss = new Set();

function walk(chunkName) {
  const chunk = manifest[chunkName];
  if (!chunk) return;
  if (chunk.file) collectedJs.add(chunk.file);
  if (Array.isArray(chunk.css)) chunk.css.forEach((c) => collectedCss.add(c));
  if (Array.isArray(chunk.imports)) chunk.imports.forEach(walk);
}

// Walk from entry's manifest key
const entryKey = Object.keys(manifest).find((k) => manifest[k] === entry);
walk(entryKey);

// Make entry the first script
const entryFile = entry.file;
const otherJs = [...collectedJs].filter((f) => f !== entryFile);

const cssLinks = [...collectedCss]
  .map((href) => `    <link rel="stylesheet" href="/${href}">`)
  .join("\n");

const modulePreloads = otherJs
  .map((href) => `    <link rel="modulepreload" href="/${href}">`)
  .join("\n");

const html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Facility Software Brasil</title>
    <meta name="description" content="Agência e software house. Marketing, sistemas, automações e aplicativos sob medida." />
    <link rel="icon" href="/favicon.ico" />
${cssLinks}
${modulePreloads}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/${entryFile}"></script>
  </body>
</html>
`;

writeFileSync(indexPath, html);
console.log(`[generate-shell] wrote ${indexPath} (entry=${entryFile})`);
