import { SelectFieldInterface } from '../material-ui-components/Select';

export interface StudentInterface {
   id: number;
   email: string;
}

export type StudentsInterface = Array<StudentInterface['email']>;

export type NewStudentsInput = StudentsInterface;

export type StudentSelectFieldInput = Array<StudentInterface>;