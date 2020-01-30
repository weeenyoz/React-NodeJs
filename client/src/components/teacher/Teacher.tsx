import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme } from "@material-ui/core/styles";
import { RouteComponentProps } from "react-router-dom";
import CardComponent from "../material-ui-components/Card";
import TabComponent from "../material-ui-components/Tab";
import useGetTeacherData from '../../hooks/useGetTeacherData';
import useGetStudentData from '../../hooks/useGetStudentData';
import TabPanelComponent from "../material-ui-components/TabPanel";
import RegisterStudentForm from "../RegisterStudentForm";
import RetrieveStudentForm from "../RetrieveStudentForm";
import SuspendStudentForm from "../SuspendStudentForm";
import RetrieveNotifiedStudentForm from "../RetrieveNotifiedStudentForm";

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

const Teacher: React.FC<RouteComponentProps> = (props) => {
  const classes = useStyles();

  console.log('props', props);

  const { teacherData, teacherLoading } = useGetTeacherData(`/api/teachers`);
  const { studentData, studentLoading } = useGetStudentData(`/api/students`);
  
  const labels = [ "Register Students", "Retrieve Common Students", "Suspend Students", "Retrieve Notified Students" ];
  const isLoading = teacherLoading && studentLoading ? true : false;

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  
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
            <TabComponent 
              value={value} 
              changeHandler={handleChange}
              labels={[...labels]}
            />
              
              <TabPanelComponent value={value} index={0}>
                <RegisterStudentForm studentData={studentData} teacherData={teacherData} />
              </TabPanelComponent>

              <TabPanelComponent value={value} index={1}>
                <RetrieveStudentForm teacherData={teacherData} {...props}/>
              </TabPanelComponent>

              <TabPanelComponent value={value} index={2}>
                <SuspendStudentForm />
              </TabPanelComponent>

              <TabPanelComponent value={value} index={3}>
                <RetrieveNotifiedStudentForm />
              </TabPanelComponent>
              
          </div>

        </div>
      )}
    </React.Fragment>
  );
};

export default Teacher;
