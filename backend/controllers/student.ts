import Student, { StudentInterface } from '../models/Student';

export const getStudents = async (req: any, res: any) => {
   const students = await Student.query().column('id', 'email');
   students && res.status(200).json({ students });
 };
 
 export const getStudent = async (req: any, res: any) => {
   const student = await Student.query().findById(req.params.id).column('id', 'email');
   const { id, email } = student;
   student && res.status(200).json({ id, email });
 }
 