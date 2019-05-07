const bcrypt = require('bcrypt');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
          username: 'username1',
          password: bcrypt.hashSync('password1', 10)
        },
        {
          username: 'username2',
          password: bcrypt.hashSync('password2', 10)
        },
        {
          username: 'username3',
          password: bcrypt.hashSync('password3', 10)
        }
      ]);
    });
};