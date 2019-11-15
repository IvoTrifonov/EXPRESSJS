const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const options = { expiresIn: '2d' };
const secret = 'MySuperPrivateSecret';
const saltRounds = 9;

const port = 3000;

let users = [
    { 
        id: 1,
        username: 'user1',
        password: '123'
    },
    { 
        id: 2,
        username: 'pesho',
        password: '123'
    },
    { 
        id: 3,
        username: 'ivaka',
        password: '123'
    }
]

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(session(
    { secret: 'my secret' },
    { httpOnly: true },
    { secure: false }
));

function auth(req, res, next) {
    const token = req.cookies['auth_cookie'];
    const data = jwt.verify(token, secret);
    const authUser = users.find(user => user.id === data.userId);
    if (!authUser) {
        res.status(401).send('401');
        return;
    }

    req.user = authUser;
    next();
}

app.get('/protected', auth, (req, res) => {
    res.send(`Hello ${req.user.username}! this is your protected page!`);
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve('pages', 'login.html'));
});

app.post('/login', (req, res) => {
    const authUser = users.find(user => user.username === req.body.username);
    if (!authUser) {
        res.send('User does not exist!');
        return;
    }
    bcrypt.compare(req.body.password, authUser.password).then(result => {
        if (!result) {
            res.sendFile(path.resolve('pages', 'login.html'));
            return;
        }

        const token = jwt.sign({ userId: authUser.id }, secret, options);
        res.cookie('auth_cookie', token);
        // req.session.userId = authUser.id;
        res.redirect('/');
    });
});

app.get('/register', (req, res) => {
    res.sendFile(path.resolve('pages', 'register.html'));
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (user) {
        res.sendFile(path.resolve('pages', 'register.html'));
        return;
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) { console.log(err.message); return; }
        users = users.concat({ id: 4, username, password: hash });

        res.redirect('/login');
    });
});

app.get('/logout', (req, res) => {
    res.clearCookie('auth-cookie').redirect('/');
    // req.session.destroy((err) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send(err.message);
    //         return;
    //     }

    //     res.redirect('/');
    // });
});


app.get('/', (req, res) => {
    res.send('Default Page!');
});

app.listen(3000, () => console.log(`Server listening on ${port}!`));