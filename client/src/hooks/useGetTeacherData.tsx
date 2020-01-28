import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetTeacher = (url: string, ) => {
  const [ teacherData, setTeacherData ] = useState(null);
  const [ teacherLoading, setTeacherLoading ] = useState(true);

  async function fetchData() {
    const result = await axios.get(url);

    if (result) {
      const { data } = result;

      setTeacherData(data);
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