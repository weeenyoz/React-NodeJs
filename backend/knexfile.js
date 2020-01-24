const path = require('path');

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: "127.0.0.1",
      database: "Ufinity_Assignment",
      user: "root",
      password: "password"
    },
    migrations: {
      directory: path.join(__dirname + "/db/migrations"),
    },
    seeds: {
      directory: path.join(__dirname + "/db/seeds"),
    }
  }
}