import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import TabPanelComponent from "./TabPanel";
import { Tabs, Tab } from "@material-ui/core";
import RegisterStudentForm from "../RegisterStudentForm";
import RetrieveStudentForm from "../RetrieveStudentForm";
import SuspendStudentForm from "../SuspendStudentForm";
import RetrieveNotifiedStudentForm from "../RetrieveNotifiedStudentForm";

const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tab: {
    color: "#1c76d2"
  }
}));

const TabComponent: React.SFC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [tabIndex, setTabIndex] = useState<object>({ id: `` });

  useEffect(() => {
    setTabIndex({
      id: `vertical-tab-${tabIndex}`,
      "aria-controls": `vertical-tabpanel-${tabIndex}`
    });
  }, [value]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
   setValue(newValue);
 };

  return (
    <React.Fragment>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        <Tab className={classes.tab} label="Register Students" {...tabIndex} />
        <Tab
          className={classes.tab}
          label="Retrieve Common Students"
          {...tabIndex}
        />
        <Tab className={classes.tab} label="Suspend Students" {...tabIndex} />
        <Tab
          className={classes.tab}
          label="Retrieve Notified Students"
          {...tabIndex}
        />
      </Tabs>

      <TabPanelComponent value={value} index={0}>
        <RegisterStudentForm />
      </TabPanelComponent>

      <TabPanelComponent value={value} index={1}>
        <RetrieveStudentForm />
      </TabPanelComponent>

      <TabPanelComponent value={value} index={2}>
        <SuspendStudentForm />
      </TabPanelComponent>

      <TabPanelComponent value={value} index={3}>
        <RetrieveNotifiedStudentForm />
      </TabPanelComponent>
    </React.Fragment>
  );
};

export default TabComponent;
