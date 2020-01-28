import React, { useState, useEffect } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme } from "@material-ui/core/styles";
import CardComponent from "../material-ui-components/Card";
import TabComponent from "../material-ui-components/Tab";
import useGetTeacherData from '../../hooks/useGetTeacherData';
import useGetStudentData from '../../hooks/useGetStudentData';
import "./teacher.scss";

interface TeacherProps {
  email?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    padding: "0 80px"
  },
  tabComponents: {
    display: "flex",
    boxShadow: `
      0px 2px 1px -1px rgba(0,0,0,0.2), 
      0px 1px 1px 0px rgba(0,0,0,0.14), 
      0px 1px 3px 0px rgba(0,0,0,0.12)
    `
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));



const Teacher: React.FC<TeacherProps> = ({ email }) => {
  const classes = useStyles();
  const [ teachers, setTeachers ] = useState([]);
  const { teacherData, teacherLoading } = useGetTeacherData(`/api/teachers`);
  const { studentData, studentLoading } = useGetStudentData(`/api/students`);

  const isLoading = teacherLoading && studentLoading ? true : false;

  return (
    <React.Fragment>
      {isLoading && (
        <Backdrop
          className={classes.backdrop}
          open={teacherLoading && studentLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      
      {!isLoading && (
        <div className={classes.root}>
          <CardComponent />

          <div className={classes.tabComponents}>
            <TabComponent />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Teacher;
