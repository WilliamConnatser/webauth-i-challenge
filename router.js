const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./data/db');
const auth = require('./server').auth;

const router = express.Router();

router.post('/register', (req, res) => {
    const {
        username,
        password
    } = req.body;

    if (username && password) {
        db.register({
                username,
                password: bcrypt.hashSync(password, 10)
            }).then(data => {
                res.status.status(200).send(data);
            })
            .catch(err => {
                res.status.status(500).send('Internal Server Error');
            });
    } else {
        res.status.status(500).send('Nice try, buddy');
    }
});

router.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body;

    if (username && password) {
        db.login({
                username,
                password: bcrypt.hashSync(password, 10)
            }).then(data => {
                if (data.username !== undefined) {
                    res.status.status(200).send(data);
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
});

router.get('/users', auth, (req, res) => {
    db.getAll().then(data => {
            res.status.status(200).send(data);
        })
        .catch(err => {
            res.status.status(500).send('Internal Server Error');
        })
});



module.exports = router;