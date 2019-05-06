const knex = require('knex');
const config = require('../knexfile');

const db = knex(config.development);

const insert = user => {
    return db('users')
        .insert(user)
        .then(response => response)
        .catch(err => err);
}

const getOne = username => {
    return db('users')
        .where({username})
        .then(response => response)
        .catch(err => err);
}

const getAll = _ => {
    return db('users')
        .then(response => response)
        .catch(err => err);
}

module.exports = {
    insert,
    getOne,
    getAll
}