exports.up = function(knex) {
  return knex.schema.createTable("teachers_students", table => {
    table.increments(),
      table
        .integer("teacher_id")
        .unsigned()
        .references("id")
        .inTable("teachers")
        .onDelete("CASCADE")
        .notNull();
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
  return knex.schema.dropTable("teachers_students");
};
