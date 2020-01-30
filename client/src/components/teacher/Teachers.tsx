import React from "react";
import Teacher from "./Teacher";

export interface TeachersProps {
  teachers: Array<React.ComponentProps<typeof Teacher>>;
}

const Teachers: React.SFC<TeachersProps> = props => {
  return <div>Teacher List Page</div>;
};

export default Teachers;
