import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import NavBar from "./components/navbar/NavBar";
import Teacher from "./components/teacher/Teacher";
import Student from "./components/student/Student";
import Login from "./components/LoginForm";
import theme from './theme';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        
        <MuiThemeProvider theme={theme}>
          
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
          </Switch>
        
        </MuiThemeProvider>
      
      </Router>
    </React.Fragment>
  );
};

export default App;
