import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import NavBar from "./components/navbar/NavBar";
import Teacher from "./components/teacher/Teacher";
import Student from "./components/student/Student";

const App: React.FC = () => {
  
  return (
    <React.Fragment>
      <Router>
        <main className="app-container">
          <NavBar />
          <Switch>
            <Route
              exact
              path="/teacher"
              render={props => (
                <Teacher {...props} email={"teacherOne@mail.com"} />
              )}
            />
            <Route
              exact
              path="/student"
              render={props => (
                <Student {...props} email={"studentOne@mail.com"} />
              )}
            />
          </Switch>
        </main>
      </Router>
    </React.Fragment>
  );
};

export default App;
