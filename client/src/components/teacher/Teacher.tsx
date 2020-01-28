import React, { useState } from "react";

interface TeacherProps {
  email?: string;
}

const Teacher: React.FC<TeacherProps> = ({ email }) => {

  return (
    <div>
      <div>Teacher Detail page</div>
    </div>
  );
};

export default Teacher;
