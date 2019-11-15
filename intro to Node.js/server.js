const http = require('http');
const url = require('url');
const port = 8080;

const app = http.createServer(function (req, res) {
    res.write('Hello World!');
    res.end();
    const { pathname } = url.parse(req['url']);
    console.log(pathname);
});

app.listen(port, function () {
   console.log(`Server is listening on ${port}`); 
});