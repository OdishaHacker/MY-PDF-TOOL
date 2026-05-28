const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOSTNAME || '0.0.0.0';
const OUT_DIR = path.join(__dirname, 'out');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.woff':  'font/woff',
  '.woff2': 'font/woff2',
  '.ttf':   'font/ttf',
  '.otf':   'font/otf',
  '.eot':   'application/vnd.ms-fontobject',
  '.txt':  'text/plain; charset=utf-8',
  '.xml':  'application/xml',
  '.pdf':  'application/pdf',
  '.zip':  'application/zip',
  '.map':  'application/json',
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function sendError(res, statusCode, message) {
  res.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!DOCTYPE html><html><body><h1>${statusCode}</h1><p>${message}</p></body></html>`);
}

function sendFile(res, filePath) {
  const contentType = getMimeType(filePath);
  
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      sendError(res, 404, 'File not found');
      return;
    }
    
    const raw = fs.createReadStream(filePath);
    const acceptEncoding = (res.req.headers['accept-encoding'] || '');
    
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600',
      'Content-Length': stats.size,
    });
    raw.pipe(res);
  });
}

const server = http.createServer((req, res) => {
  // Parse the URL - remove query string
  let urlPath = (req.url || '/').split('?')[0];
  
  // Decode URI components
  try {
    urlPath = decodeURIComponent(urlPath);
  } catch (e) {
    sendError(res, 400, 'Bad Request');
    return;
  }
  
  // Security: prevent directory traversal
  const safePath = path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(OUT_DIR, safePath);
  
  // Strategy 1: Exact file match
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    sendFile(res, filePath);
    return;
  }
  
  // Strategy 2: Directory with index.html (e.g., /merge-pdf/ -> /merge-pdf/index.html)
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    const indexPath = path.join(filePath, 'index.html');
    if (fs.existsSync(indexPath)) {
      sendFile(res, indexPath);
      return;
    }
  }
  
  // Strategy 3: Add trailing slash and look for index.html
  // (e.g., /merge-pdf -> /merge-pdf/index.html)
  const dirPath = path.join(OUT_DIR, safePath);
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    const indexPath = path.join(dirPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      sendFile(res, indexPath);
      return;
    }
  }
  
  // Strategy 4: Try .html extension (e.g., /merge-pdf -> /merge-pdf.html)
  const htmlPath = filePath + '.html';
  if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
    sendFile(res, htmlPath);
    return;
  }
  
  // Strategy 5: Try /index.html in subdirectory without trailing slash
  // (e.g., /merge-pdf -> /out/merge-pdf/index.html even if /merge-pdf dir check failed)
  const subDirIndex = path.join(OUT_DIR, safePath.replace(/\/$/, ''), 'index.html');
  if (fs.existsSync(subDirIndex)) {
    sendFile(res, subDirIndex);
    return;
  }
  
  // Strategy 6: Fallback - check _not-found page
  const notFoundPath = path.join(OUT_DIR, '_not-found', 'index.html');
  if (fs.existsSync(notFoundPath)) {
    sendFile(res, notFoundPath);
    return;
  }
  
  // Final fallback: serve homepage (for any SPA-like routes)
  const homePath = path.join(OUT_DIR, 'index.html');
  if (fs.existsSync(homePath)) {
    sendFile(res, homePath);
    return;
  }
  
  sendError(res, 404, 'Page not found');
});

server.listen(PORT, HOST, () => {
  console.log(`🚀 Server running at http://${HOST}:${PORT}`);
  console.log(`📁 Serving files from: ${OUT_DIR}`);
});
