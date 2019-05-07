const knex = require('knex');
const config = require('../knexfile');

const db = knex(config.development);

const register = user => {
    return db('users')
        .insert(user)
        .then(response => response);
}

const login = username => {
    return db('users')
        .where({
            username
        })
        .first()
        .then(response => {
            return response
        });
}

const getById = id => {
    return db('users')
        .where({id})
        .select(['id', 'username'])
        .first()
        .then(response => response);
}

const getAll = _ => {
    return db('users')
        .select(['id', 'username'])
        .then(response => response);
}

module.exports = {
    register,
    login,
    getById,
    getAll
}