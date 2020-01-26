import Teacher from "../models/Teacher";

export const getAll = async (req: any, res: any) => {
  const teachers = await Teacher.query();
  teachers && res.send(teachers);
};

export const register = async (req: any, res: any) => {
  const { teacher, students } = req.body;

  const input: object = {
    id: teacher.id && teacher.id,
    email: teacher.email,
    students: students.map((student: {id: number, email: string}) => ({ id: student.id && student.id, email: student.email }))
  };

  const options = {
    relate: ["students"], 
    unrelate: ["students"] 
  };
  
  try {
    const result = await Teacher.register(input, options);
    res.send(result);
  } catch (error) {
    console.log(error)
  }
};
