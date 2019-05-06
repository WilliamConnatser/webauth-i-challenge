exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
          username: 'username1',
          password: 'password1'
        },
        {
          username: 'username2',
          password: 'password2'
        },
        {
          username: 'username3',
          password: 'password3'
        }
      ]);
    });
};