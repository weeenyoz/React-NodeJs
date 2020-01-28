import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CardComponent from '../material-ui-components/Card';
import TabComponent from '../material-ui-components/Tab';
import './teacher.scss';

interface TeacherProps {
  email?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    padding: '0 80px'
  },
  tabComponents: {
    display: 'flex'
  }
}));

const Teacher: React.FC<TeacherProps> = ({ email }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CardComponent />

      <div className={classes.tabComponents}>
        <TabComponent />
      </div>

    </div>
  );
};

export default Teacher;
