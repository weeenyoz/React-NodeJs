
exports.up = function(knex) {
  return knex.schema.createTable('teachers', (table) => {
     table.increments(),
     table.string('email').notNull().default(''),
     table.timestamps(true, true)
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('teachers');
};
