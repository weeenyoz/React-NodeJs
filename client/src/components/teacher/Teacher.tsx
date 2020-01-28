import React, { useState, useEffect } from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../TabPanel';
import RegisterStudentForm from "../RegisterStudentForm";
import RetrieveStudentForm from "../RetrieveStudentForm";
import SuspendStudentForm from "../SuspendStudentForm";
import RetrieveNotifiedStudentForm from "../RetrieveNotifiedStudentForm";

interface TeacherProps {
  email?: string;
}

const Teacher: React.FC<TeacherProps> = ({ email }) => {
  const [ tabIndex, setTabIndex ] = useState<object>({ id: `` })
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setTabIndex({
      id: `simple-tab-${tabIndex}`,
      'aria-controls': `simple-tabpanel-${tabIndex}`,
    });
  }, [value]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };  

  return (
    <div>
      <h3>Teacher Page</h3>
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Register Students" {...tabIndex} />
        <Tab label="Retrieve Common Students" {...tabIndex} />
        <Tab label="Suspend Students" {...tabIndex} />
        <Tab label="Retrieve Notified Students" {...tabIndex} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <RegisterStudentForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RetrieveStudentForm />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SuspendStudentForm />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <RetrieveNotifiedStudentForm />
      </TabPanel>
    </div>
  );
};

export default Teacher;
