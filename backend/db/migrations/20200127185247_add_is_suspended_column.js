
exports.up = function(knex) {
  return knex.schema.alterTable('students', table => {
     table
      .boolean('is_suspended')
      .after('email')
      .notNull()
      .defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.table('students', table => {
      table.dropColumn('is_suspended');
  });
};
