const http = require("http");
const fs = require('fs');
const url = require('url');

class StaticServer {
    currentServer = null;

    start(root, port) {
        this.currentServer = http.createServer((req, rsp) => {
            const pname = url.parse(req.url).pathname,
                path = pname === '/' ? `${root}/default.html` : `${root}/${pname}`;
            this.tryReadFile(path, rsp);
        }).listen(port);
        console.info(`HTTP server is listening at port ${port}.`);
    }

    stop() {
        this.currentServer.close(() => console.log('Server stoped.'));
    }

    response(rsp, data) {
        rsp.writeHead(200, { 'Content-Type': 'text/html' });
        rsp.write(data);
        rsp.end();
    }

    tryReadFile(path, rsp) {
        return new Promise((resolve, reject) => fs.readFile(path, (err, data) => err ? this.error(rsp, 404) : this.response(rsp, data)));
    }

    error(rsp, num) {
        rsp.writeHead(num, { 'Content-Type': 'text/plain' });
        rsp.write(`Error ${num}.`);
        rsp.end();
    }
}

new StaticServer().start('.', 8080);