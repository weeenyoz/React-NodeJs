import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Tabs, Tab } from "@material-ui/core";

interface TagComponentProps {
  changeHandler: (e: React.ChangeEvent<{}>, value: number) => void
  value: number
  labels: string[]
}

const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tab: {
    color: "#1c76d2"
  },
}));

const TabComponent: React.FC<TagComponentProps> = (props) => {
  const classes = useStyles();
  
  const { value, changeHandler, labels } = props;
  const [ tabIndex, setTabIndex ] = useState<object>({ id: `` });

  useEffect(() => {
    setTabIndex({
      id: `vertical-tab-${tabIndex}`,
      "aria-controls": `vertical-tabpanel-${tabIndex}`
    });
  }, [value]);

  return (
    <React.Fragment>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={(e, value) => changeHandler(e, value)}
        className={classes.tabs}
      >
        { labels.map(( label: string ) => <Tab className={classes.tab}  label={label} {...tabIndex} />) }
      </Tabs>
    </React.Fragment>
  );
};

export default TabComponent;
