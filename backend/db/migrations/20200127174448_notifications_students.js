exports.up = function(knex) {
  return knex.schema.createTable("notifications_students", table => {
    table.increments(),
    table
      .integer("student_id")
      .unsigned()
      .references("id")
      .inTable("students")
      .onDelete("CASCADE")
      .notNull();
    table
      .integer("notification_id")
      .unsigned()
      .references("id")
      .inTable("notifications")
      .onDelete("CASCADE")
      .notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {};
