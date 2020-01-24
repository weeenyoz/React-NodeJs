import { useState } from "react";

export interface Student {
  email: string;
}

const useCreateStudent = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const createStudent = (email: string) => {
    const nextTodos: Student[] = [...students, { email }]
    setStudents(nextTodos);
  };

  return { students, createStudent }

};

export default useCreateStudent;
