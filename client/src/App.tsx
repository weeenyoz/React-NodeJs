import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Teacher from "./components/teacher/Teacher";
import Student from "./components/student/Student";

const teachers = [
  { email: "teacherOne@mail.com" },
  { email: "teacherOne@mail.com" },
  { email: "teacherOne@mail.com" }
];

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        {/* <Nav /> */}
        <Route path="/teacher" render={(props) => <Teacher {...props} email={"teacherOne@mail.com"} />} />
        <Route path="/student" render={(props) => <Student {...props} email={"studentOne@mail.com"} />} />
      </Router>
    </React.Fragment>
  );
};

export default App;
