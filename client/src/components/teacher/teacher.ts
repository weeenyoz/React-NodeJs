import { SelectFieldInterface } from '../material-ui-components/Select';

export interface TeacherInterface {
   id: number;
   email: string;
}

export type TeachersInterface = TeacherInterface[];

export type NewTeacherInput = TeacherInterface['email'];

export type TeacherSelectFieldInput = SelectFieldInterface;