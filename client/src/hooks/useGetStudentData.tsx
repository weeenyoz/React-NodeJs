import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetStudent = (url: string, ) => {
  const [ studentData, setStudentData ] = useState([]);
  const [ studentLoading, setStudentLoading ] = useState(true);

  async function fetchData() {
    const result = await axios.get(url);

    if (result) {
      const { data } = result;
      const student = data.students
      setStudentData(student);
      setStudentLoading(false);
    } else {
       console.log("error in fetching result", result);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { studentData, studentLoading };
};

export default useGetStudent;