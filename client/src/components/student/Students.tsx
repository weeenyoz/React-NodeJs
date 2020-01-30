import React from "react";
import Student from "./Student";

interface StudentsListProps {
  students: Array<React.ComponentProps<typeof Student>>;
}

const Students: React.FC<StudentsListProps> = ({ students }) => {
  return <div>Student list page</div>;
};

export default Students;
