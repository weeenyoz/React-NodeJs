import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import NavBar from "./components/navbar/NavBar";
import Teacher from "./components/teacher/Teacher";
import Student from "./components/student/Student";
import Students from "./components/student/Students";

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
              render={props => <Teacher {...props} />}
            />
            <Route
              exact
              path="/student"
              render={props => <Student data={props} />}
            />
            <Route
              path="/commonstudents"
              render={props => <Students {...props}/>}
            />
          </Switch>
        </main>
      </Router>
    </React.Fragment>
  );
};

export default App;
