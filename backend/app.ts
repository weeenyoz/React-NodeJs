import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express();

// routes
// const teacherRoutes = require('./routes/teachers');
// const studentRoutes = require('./routes/students');

// const mysqlConnnection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "Ufinity_Assignment",
//   multipleStatements: true
// });

// mysqlConnnection.connect(err => {
//   if (!err) {
//     console.log("Connected to MySql DB");
//   } else {
//     console.log(err);
//     console.log("Error connecting to MySql DB");
//   }
// });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/api/teacher', teacherRoutes);
// app.use('/api/student', studentRoutes);

export default app;