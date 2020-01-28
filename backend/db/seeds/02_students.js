
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {email: 'studentClare@mail.com'},
        {email: 'studentMike@mail.com'},
        {email: 'studentSmit@mail.com'}
      ]);
    });
};
