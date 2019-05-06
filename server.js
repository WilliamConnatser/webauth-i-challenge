const express = require('express');
const router = require('./router');
const db = require('./data/db');

const server = express();

server.use(express.json());

server.use('/api', router);

const auth = (req, res, next) => {
    const {
        username,
        password
    } = req.headers;

    if (username && password) {
        db.login({
                username,
                password: bcrypt.hashSync(password, 10)
            }).then(data => {
                if (data.username !== undefined) {
                    next();
                } else {
                    res.status.status(500).send('Nice try, buddy');
                }
            })
            .catch(err => {
                res.status.status(500).send('Internal Server Error');
            });
    } else {
        res.status.status(500).send('Username and password required');
    }
}

module.exports = {
    auth,
    server
};