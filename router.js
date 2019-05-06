const express = require('express');

const router = express.Router();

router.post('/register', (req, res) => {
    const {
        username,
        password
    } = req.body;

    if(username && password) {
        res.status.status(200).send('You\'re good, buddy');
    } else {
        res.status.status(500).send('Nice try, buddy');
    }
});

router.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body;

    if(username && password) {
        res.status.status(200).send('You\'re good, buddy');
    } else {
        res.status.status(500).send('Nice try, buddy');
    }
});

router.get('/users', (req, res) => {

    if(username && password) {
        res.status.status(200).send('You\'re good, buddy');
    } else {
        res.status.status(500).send('Nice try, buddy');
    }
});



module.exports = router;