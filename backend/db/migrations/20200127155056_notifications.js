exports.up = function(knex) {
   return knex.schema.createTable('notifications', table => {
     table.increments(),
      table
        .integer('teacher_id')
        .unsigned()
        .references('id')
        .inTable('teachers')
        .onDelete('CASCADE')
        .notNull();
      table
         .text('message')
         .notNull()
         .default('');
     table.timestamps(true, true);
   });
 };
 exports.down = function(knex) {
   return knex.schema.dropTable('notifications');
 };
 