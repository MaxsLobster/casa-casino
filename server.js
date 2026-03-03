const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

const dir = __dirname;

http.createServer((req, res) => {
  let url = req.url.split('?')[0];
  if (url === '/' || url === '/casa-casino/' || url === '/casa-casino') url = '/index.html';
  const filePath = path.join(dir, url);
  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found: ' + url);
    } else {
      res.writeHead(200, {'Content-Type': MIME[ext] || 'application/octet-stream'});
      res.end(data);
    }
  });
}).listen(8080, () => console.log('Server running on http://localhost:8080'));
