import mysql from "mysql";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import errorHandler from "./middleware/error";
import teacherRoutes from "./routes/teacher";

const app = express();

export const mysqlConnnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "Ufinity_Assignment",
  multipleStatements: true
});

mysqlConnnection.connect(err => {
  if (!err) {
    console.log("Connected to MySql DB");
  } else {
    console.log("Error connecting to MySql DB", err);
  }
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/", teacherRoutes);
app.use(errorHandler);

export default app;
