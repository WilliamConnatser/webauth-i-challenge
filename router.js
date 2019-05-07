const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./data/db');

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
                return db.getById(data[0]);
            })
            .then(user => {
                res.status(200).send(user);
            })
            .catch(err => {
                if (err.errno !== undefined && err.errno === 19)
                    res.status(500).send('Username Taken');
                else
                    res.status(500).send('Internal Server Error');
            });
    } else {
        res.status(500).send('Nice try, buddy');
    }
});

router.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body;

    if (username && password) {
        db.login(username).then(user => {
                if (user !== undefined && bcrypt.compareSync(password, user.password, 10)) {
                    req.session.username = username;
                    return db.getById(user.id);
                } else {
                    res.status(401).send('Nice try, buddy');
                }

            })
            .then(user => {
                res.status(200).send(user);
            })
            .catch(err => {
                console.log(err)
                res.status(500).send('Internal Server Error');
            });
    } else {
        res.status(401).send('Username and password required');
    }
});

const auth = (req, res, next) => {
    const {
        username,
        password
    } = req.headers;

    //Using session and cookies
    if (req.session && req.session.username !== undefined) {
        next();
    }

    //Without cookies using headers
    // if (username && password) {
    //     db.login(username).then(user => {
    //             if (user !== undefined && bcrypt.compareSync(password, user.password, 10)) {
    //                 next();
    //             } else {
    //                 res.status(401).send('Nice try, buddy... access denied!!');
    //             }
    //         })
    //         .catch(err => {
    //             res.status(500).send('Internal Server Error');
    //         });
    // }
    else {
        res.status(401).send('Login required');
    }
}

router.get('/users', auth, (req, res) => {
    db.getAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send('Internal Server Error');
        });
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err)
                res.status(500).send('Error logging out')
            else
                res.status(200).send('You\'re logged out')
        })
    } else {
        req.status(300).send('You aint even logged in...')
    }
})



module.exports = router;