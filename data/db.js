const knex = require('knex');
const config = require('../knexfile');

const db = knex(config.development);

const register = user => {
    return db('users')
        .insert(user)
        .then(response => response)
        .catch(err => err);
}

const login = ({
    username,
    password
}) => {
    return db('users')
        .where({
            username,
            password
        })
        .then(response => response)
        .catch(err => err);
}

const getAll = _ => {
    return db('users')
        .then(response => response)
        .catch(err => err);
}

module.exports = {
    register,
    login,
    getAll
}