import knex from "knex";

const knexConnection = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    database: "Ufinity_Assignment",
    user: "root",
    password: "password"
  }
});

export default knexConnection;
