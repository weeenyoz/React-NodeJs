import React from "react";

interface StudentProps {
  data?: any;
}

const Student: React.FC<StudentProps> = props => {
  return (
    <React.Fragment>
      <p>Student detail page</p>
    </React.Fragment>
  );
};

export default Student;
