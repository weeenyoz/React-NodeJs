import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetTeacher = (url: string, ) => {
  const [ teacherData, setTeacherData ] = useState();
  const [ teacherLoading, setTeacherLoading ] = useState(true);

  async function fetchData() {
    const result = await axios.get(url);

    if (result) {
      const { data } = result;
      const teacher = data.teachers
      setTeacherData(teacher);
      setTeacherLoading(false);
    } else {
       console.log("error in fetching result", result);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { teacherData, teacherLoading };
};

export default useGetTeacher;