const express = require('express');
const router = require('./router');

const session = require('express-session');
const sessionSettings = {
    name: 'auth',
    secret: 'my super secret is secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false
}

const server = express();
server.use(session(sessionSettings));

server.use(express.json());
server.use('/api', router);


module.exports = server;