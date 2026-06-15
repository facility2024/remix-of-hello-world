import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = resolve(__dirname, "..");
const clientRoot = resolve(projectRoot, "dist/client");
const port = Number(process.env.PORT || 3000);
let workerPromise;

const MIME_TYPES = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

function getSafeFilePath(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const normalizedPath = normalize(decodedPath).replace(/^([.][.][/\\])+/, "");
  const filePath = resolve(join(clientRoot, normalizedPath.replace(/^[/\\]+/, "")));

  if (!filePath.startsWith(clientRoot)) {
    return null;
  }

  return filePath;
}

function isStaticAsset(pathname) {
  return pathname !== "/" && extname(pathname) !== "";
}

function serveStaticFile(filePath, req, res) {
  const stats = statSync(filePath);
  const ext = extname(filePath).toLowerCase();

  res.statusCode = 200;
  res.setHeader("Content-Type", MIME_TYPES[ext] || "application/octet-stream");
  res.setHeader("Content-Length", stats.size);

  if (filePath.includes(`${join("dist", "client", "assets")}${process.platform === "win32" ? "\\" : "/"}`)) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  }

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  createReadStream(filePath).pipe(res);
}

function serveClientIndex(req, res) {
  const indexFile = join(clientRoot, "index.html");

  if (existsSync(indexFile)) {
    serveStaticFile(indexFile, req, res);
    return true;
  }

  return false;
}

function toWebRequest(req, bodyBuffer) {
  const url = new URL(req.url || "/", `http://${req.headers.host || `127.0.0.1:${port}`}`);
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const item of value) headers.append(key, item);
    } else if (value !== undefined) {
      headers.set(key, value);
    }
  }

  const method = req.method || "GET";
  const init = { method, headers };

  if (method !== "GET" && method !== "HEAD") {
    init.body = bodyBuffer;
    init.duplex = "half";
  }

  return new Request(url, init);
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return chunks.length ? Buffer.concat(chunks) : undefined;
}

async function getWorker() {
  const serverEntryPath = resolve(projectRoot, "dist/server/server.js");

  if (!existsSync(serverEntryPath)) {
    throw new Error("Build do servidor não encontrado em dist/server/server.js");
  }

  workerPromise ||= import(pathToFileURL(serverEntryPath).href).then((module) => module.default || module);
  return workerPromise;
}

async function sendWebResponse(webResponse, res) {
  res.statusCode = webResponse.status;
  webResponse.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (!res.hasHeader("Content-Type") && webResponse.status !== 204 && webResponse.status !== 304) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
  }

  if (webResponse.body && res.req?.method !== "HEAD") {
    const body = Buffer.from(await webResponse.arrayBuffer());
    res.setHeader("Content-Length", body.length);
    res.end(body);
    return;
  }

  res.end();
}

const server = createServer(async (req, res) => {
  try {
    const pathname = new URL(req.url || "/", `http://${req.headers.host || `127.0.0.1:${port}`}`).pathname;

    if (pathname === "/health" || pathname === "/healthz") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Cache-Control", "no-store");
      res.end("ok");
      return;
    }

    const filePath = getSafeFilePath(pathname);

    if (filePath && existsSync(filePath) && statSync(filePath).isFile()) {
      serveStaticFile(filePath, req, res);
      return;
    }

    if (filePath && existsSync(filePath) && statSync(filePath).isDirectory()) {
      const indexFile = join(filePath, "index.html");
      if (existsSync(indexFile)) {
        serveStaticFile(indexFile, req, res);
        return;
      }
    }

    if (isStaticAsset(pathname)) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Not Found");
      return;
    }

    const worker = await getWorker();
    const request = toWebRequest(req, await readBody(req));
    const webResponse = await worker.fetch(request, { ASSETS: { fetch: () => new Response("Not Found", { status: 404 }) } });
    await sendWebResponse(webResponse, res);
  } catch (error) {
    console.error("EasyPanel server error", error);
    const pathname = new URL(req.url || "/", `http://${req.headers.host || `127.0.0.1:${port}`}`).pathname;

    if (!isStaticAsset(pathname) && serveClientIndex(req, res)) {
      return;
    }

    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
});

server.listen(port, "0.0.0.0", async () => {
  const faviconPath = join(clientRoot, "favicon.ico");
  const hasClientBuild = existsSync(clientRoot);
  const hasServerBuild = existsSync(resolve(projectRoot, "dist/server/server.js"));
  const hasFavicon = existsSync(faviconPath) ? (await readFile(faviconPath)).length > 0 : false;
  console.log(`Facility app listening on http://0.0.0.0:${port}`);
  console.log(`dist/client: ${hasClientBuild} | dist/server/server.js: ${hasServerBuild} | favicon: ${hasFavicon}`);
});