import { createServer } from "node:http";
import { createReadStream, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { app } from "./server.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;
const clientDir = path.join(dirname, "../dist/client");

// Production SSR handler built by `vite build` (dist/server/server.js).
const ssrModule = await import(pathToFileURL(path.join(dirname, "../dist/server/server.js")));
const ssrHandler = ssrModule.default;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".pdf": "application/pdf",
  ".webm": "video/webm",
  ".mp4": "video/mp4",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

// Serve the client build output (dist/client) for static assets/images.
function serveStatic(req, res) {
  const url = new URL(req.url, "http://localhost");
  const relative = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  const filePath = path.resolve(clientDir, relative);

  if (filePath !== clientDir && !filePath.startsWith(clientDir + path.sep)) return false;
  if (filePath === clientDir) return false;

  let stats;
  try {
    stats = statSync(filePath);
  } catch {
    return false;
  }
  if (!stats.isFile()) return false;

  const ext = path.extname(filePath).toLowerCase();
  res.statusCode = 200;
  res.setHeader("Content-Type", MIME_TYPES[ext] || "application/octet-stream");
  res.setHeader(
    "Cache-Control",
    relative.startsWith("assets/")
      ? "public, max-age=31536000, immutable"
      : "public, max-age=86400",
  );

  if (req.method === "HEAD") {
    res.end();
  } else {
    createReadStream(filePath).pipe(res);
  }
  return true;
}

function readBody(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (c) => chunks.push(c));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

function toWebHeaders(req) {
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value == null) continue;
    if (Array.isArray(value)) {
      for (const item of value) headers.append(key, item);
    } else {
      headers.append(key, value);
    }
  }
  return headers;
}

async function handleSsr(req, res) {
  const proto = req.headers["x-forwarded-proto"]?.split(",")[0] || "http";
  const host = req.headers.host || "localhost";
  const url = new URL(req.url, `${proto}://${host}`);

  const isBodyless = req.method === "GET" || req.method === "HEAD";

  const request = new Request(url, {
    method: req.method,
    headers: toWebHeaders(req),
    ...(isBodyless ? {} : { body: await readBody(req) }),
  });

  const response = await ssrHandler.fetch(request, {}, {});

  res.statusCode = response.status;
  response.headers.forEach((value, key) => res.setHeader(key, value));
  res.end(Buffer.from(await response.arrayBuffer()));
}

const server = createServer((req, res) => {
  const urlPath = new URL(req.url, `http://${req.headers.host || "localhost"}`).pathname;

  if (urlPath.startsWith("/api")) {
    app(req, res);
    return;
  }

  if ((req.method === "GET" || req.method === "HEAD") && serveStatic(req, res)) {
    return;
  }

  handleSsr(req, res).catch((err) => {
    console.error(err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end("Internal Server Error");
    } else {
      res.destroy();
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Red Dot site + API running on http://localhost:${PORT}`);
});
