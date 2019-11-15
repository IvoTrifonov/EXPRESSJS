const stream = require('stream');
const data = ['1', '2', '3', '4', null];

class MyReadableStream extends stream.Readable {
    constructor(opt) {
        super(opt);
    }

    _read() {
        data.forEach(item => this.push(item));
    }
}

class MyWritableStream extends stream.Writable {
    constructor(opt) {
        super(opt);
        this.result = '';
    }

    _write(chunk, encoding, next) {
        console.log(chunk.toString());
        this.result += chunk;
        next();
    }
}

const read = new MyReadableStream();
const write = new MyWritableStream();

write.on('finish', function() {
    console.log(this.result);
});

read.pipe(write);



