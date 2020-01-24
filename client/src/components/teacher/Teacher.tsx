import React, { useState } from "react";
import '../shared.scss';
import useCreateStudent from '../../hooks/useCreateStudent';

interface TeacherProps {
  email: string;
}

const Teacher: React.FC<TeacherProps> = ({ email }) => {
  const [ emailValue, setEmailValue ] = useState<string>("");
  const [ isRegisterStudent, setIsRegisterStudent ] = useState(false);
  const { students, createStudent } = useCreateStudent();

  const handleSubmit = (e: any) => {
   e.preventDefault();

   createStudent(emailValue);
   setEmailValue("");
 };

  return (
    <React.Fragment>
      <h3>Teacher: <span className="email">{email}</span></h3>
      <button onClick={() => setIsRegisterStudent(true)}>Register a new student</button>
      
      { 
         isRegisterStudent && 
         <form onSubmit={handleSubmit}>
            <div>
               <label>Teacher</label>
               <input
                  type="email"
                  value={email}
                  onChange={e => setEmailValue(e.target.value)}
               />
            </div>
            <div>
               <label>Student: </label>
               <input
                  type="email"
                  value={email}
                  onChange={e => setEmailValue(e.target.value)}
               />
               <button type="submit">Register Student</button>
            </div>
         </form>
      }
    </React.Fragment>
  );
};

export default Teacher;
