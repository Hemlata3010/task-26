const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const publicDir = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
    let filePath = path.join(publicDir, req.url === '/' ? 'home.html' : `${req.url}.html`);
    let contentType = 'text/html';

    // Check if the requested file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found, send 404 response
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
        } else {
            // File found, serve the HTML file
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf8');
                }
            });
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/*Routing: The server uses the Node.js http module to create an HTTP server. It handles different routes (/home, /about, /contact) and serves corresponding HTML pages (home.html, about.html, contact.html).
Error Handling: If a requested route does not exist, the server responds with a custom 404 page.
HTTP Status Codes: The server sends appropriate HTTP status codes (200 for successful responses, 404 for not found, etc.).
Modularity: It uses asynchronous file operations (fs.readFile) to read HTML files and modular code structure for better organization and maintainability.
*/