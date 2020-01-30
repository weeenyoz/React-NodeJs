import { useState } from 'react';
import axios from 'axios';

const useRegisterStudents = (url: string) => {
   const [ isRegistered, setIsRegistered ] = useState<boolean>(false);

   const registerStudents = async (payload: any) => {
      const result = await axios.post(url, payload);
      result && setIsRegistered(true);
   }

   return { isRegistered, registerStudents }
   
}

export default useRegisterStudents;
