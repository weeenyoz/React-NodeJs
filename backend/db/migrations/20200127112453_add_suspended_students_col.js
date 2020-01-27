exports.up = function(knex) {
   return knex.schema.alterTable("students", table => {
     table
       .integer("suspended_students_id")
       .after('email')
       .unsigned()
       .references("id")
       .inTable("suspended_students")
       .onDelete("CASCADE");
   });
 };
 
 exports.down = function(knex) {
   return knex.schema.table("students", table => {
      table.dropColumn('suspended_students_id');
  });
 };
 