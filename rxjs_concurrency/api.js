const http = require('http');

http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    // http://localhost:3000/response/{"data": "hello world"}/delay/3000/
    const matchURL = /^\/response\/(.+)\/delay\/(\d+)\/?$/;

    if (!matchURL.test(req.url)) return res.end();

    const [, response, delay] = matchURL.exec(req.url);
    const jsonResponse = decodeURIComponent(response);

    setTimeout(() => {
      res.write(jsonResponse);
      res.end();
    }, Number(delay));
  })
  .listen(3000);
