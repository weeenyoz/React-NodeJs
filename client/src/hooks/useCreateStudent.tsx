import { useState } from "react";

export interface Student {
  email: string;
}

const useCreateStudent = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const createStudent = (email: string) => {
    console.log('inside useCreateStudent\'s hook createStudent method')
  };

  return { students, createStudent }

};

export default useCreateStudent;
