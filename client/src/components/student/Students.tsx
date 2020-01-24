import React from "react";
import Student from './Student';

interface StudentsListProps {
  students: Array<React.ComponentProps<typeof Student>>;
}

const Students: React.FC<StudentsListProps> = ({ students }) => {
  return (
    <React.Fragment>
      {students.map(student => <li>{ student.email }</li>)}
    </React.Fragment>
  );
};

export default Students;
