import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanelComponent: React.SFC<TabPanelProps> = (props: TabPanelProps) => {
  const { children, value, index } = props;
  
  return (
    <Box
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      width="100%"
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Box>
  );
};

export default TabPanelComponent;
