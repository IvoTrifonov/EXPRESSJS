const express = require('express');
const app = express();
const port = 3000;
const api = require('./api');

app.use('/api', api);

app.use(express.static(__dirname + '/public'));

function defaultHandler(req, res) {
    res.send('<h1>Hello user</h1><script src="index.js"></script>')
}

app.get('/', defaultHandler);

app.listen(port, () => {
    console.log(`Server is listenning on ${port}...`);
});

