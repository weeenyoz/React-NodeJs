exports.up = function(knex) {
  return knex.schema.createTable("suspended_students", table => {
    table.increments(),
      table
        .integer("student_id")
        .unsigned()
        .references("id")
        .inTable("students")
        .onDelete("CASCADE")
        .notNull();
    table.timestamps(true, true);
  });
};
exports.down = function(knex) {
  return knex.schema.dropTable("suspended_students");
};
