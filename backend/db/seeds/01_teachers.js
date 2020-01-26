
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('teachers').del()
    .then(function () {
      // Inserts seed entries
      return knex('teachers').insert([
        {email: 'teacherDavid@mail.com'},
        {email: 'teacherJonathan@mail.com'},
        {email: 'teacherLukas@mail.com'}
      ]);
    });
};
