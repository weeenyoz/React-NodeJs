import React from 'react'
import Teacher from './Teacher';

export interface TeachersProps {
   teachers: Array<React.ComponentProps<typeof Teacher>>
}
 
const Teachers: React.SFC<TeachersProps> = (props) => {
   console.log("teachers props: ", props)
   return (
      <React.Fragment>
         <h2>List of Registered Teachers</h2>
         {/* {teachers.map(teacher => <li>{teacher.email}</li>)} */}
      </React.Fragment>
   );
}
 
export default Teachers;