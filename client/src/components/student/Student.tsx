import React from "react";

interface StudentProps {
  email: string;
}

const Student: React.FC<StudentProps> = props => {
  const { email } = props;
  return (
    <React.Fragment>
      <p>{email}</p>
    </React.Fragment>
  );
};

export default Student;
