import React from "react";

interface StudentProps {
  email?: string;
}

const Student: React.FC<StudentProps> = props => {
  return (
    <React.Fragment>
      <p>Student detail page</p>
    </React.Fragment>
  );
};

export default Student;
