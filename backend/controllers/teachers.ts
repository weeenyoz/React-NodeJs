import { flatten } from 'lodash';
import Teacher, { TeacherInterface } from "../models/Teacher";
import Student, { StudentInterface } from '../models/Student';
import SuspendedStudent from '../models/SuspendedStudents';
import Notification, { NotificationInterface } from '../models/Notifications';
import { isArray } from "util";

interface RegistrationVariables {
  teacher: { id: number; email: string } | string;
  students: Array<{ id: number; email: string }> | string[];
}

interface SuspendVariables {
  student: StudentInterface['email'];
}

interface CreateBodyVariables<TBodyVariables> {
  body: TBodyVariables;
}

interface CreateQueryVariables<TQueryVariables> {
  query: TQueryVariables;
}

type RegistrationRequestVariables = CreateBodyVariables<RegistrationVariables>;

type SuspendRequestVariables = CreateBodyVariables<SuspendVariables>

interface StudentListVariables {
  teacher: string | string[];
}

type StudentListQueryVariables = CreateQueryVariables<StudentListVariables>

interface CreateNotificationVariables {
  teacher: TeacherInterface['email'];
  notification: NotificationInterface['message'];
}

type CreateNotificationReqVariables = CreateBodyVariables<CreateNotificationVariables>

export const getAll = async (req: any, res: any) => {
  const teachers = await Teacher.query();
  teachers && res.send(teachers);
};

export const register = async (req: RegistrationRequestVariables, res: any) => {
  const { teacher, students } = req.body;

  const email = typeof teacher === 'object' ? teacher.email : teacher;
  const id = typeof teacher === 'object' ? teacher.id : undefined;

  const isTeacherExists = await Teacher.query().where("email", email);

  if (!id && isTeacherExists.length !== 0) {
    res.status(400).json({ message: "Teacher already exists" });
  } else {
    const input: object = {
      id,
      email,
      students: (students as Array<{ id: number; email: string } | string>).map(
        student => typeof student === "object" ?
          { id: student.id && student.id, email: student.email }
          : { email: student }
      )
    };

    const options = {
      relate: ["students"],
      unrelate: ["students"]
    };

    try {
      const result = await Teacher.register(input, options);
      result && res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while creating registering." });
    }
  }
};

export const getCommonStudents = async (req: StudentListQueryVariables, res: any) => {
  const { teacher } = req.query;

  if (!isArray(teacher)) {
    try {
      const givenTeacher = Teacher.query().where('email', teacher);
      const commonstudents = await Teacher.relatedQuery('students').for(givenTeacher);
  
      res.status(200).json({ students: commonstudents });
    } catch (error) {
      res.status(500).json({ message: 'An error occured while retrieving data' });
    }
  } else {
    try {
      const givenTeachersPromises = teacher.map(async ( t: string ) => {
        return await Teacher.query().where('email', t);
      });
  
      const resolvedGivenTeachers = await Promise.all(givenTeachersPromises);
      const givenTeachers = flatten(resolvedGivenTeachers);
  
      const teachersIds = givenTeachers.map(( teacher: Teacher ) => teacher.id );
  
      const commonStudents = await Teacher.relatedQuery('students').for(teachersIds)
  
      res.status(200).json({ students: commonStudents });
    } catch (error) {
      res.status(500).json({ message: 'An error occured while retrieving data' });
    }
  }

};

export const suspendStudent = async (req: SuspendRequestVariables, res: any) => {
  const { student } = req.body;

  const studentToSuspend = await Student.query().select().where('email', student);

  if ( studentToSuspend.length === 0 ) {
    res.status(404).json({ message: 'No student found' });
  } 
  else {
    const { id } = studentToSuspend[0];

    const input: object = {
      student_id: id
    };

    const options = {
      relate: ["students"],
      unrelate: ["students"]
    };
    
    try {
      const isStudentExists = await SuspendedStudent.query().select().where('student_id', id);
      if (isStudentExists.length > 0) {
        res.status(400).json({ message: 'Student is already suspended' });
      } 
      else {
        const result = await SuspendedStudent.suspend(input, options);
        result && res.status(204).send();
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while suspending student." });
    }
  }

}

export const createNotification = async (req: CreateNotificationReqVariables, res: any) => {
  const { teacher, notification } = req.body;

  const isTeacherExists = await Teacher.query().where('email', teacher);

  if (isTeacherExists.length === 0) {
    res.status(400).json({ message: `Unable to create notification, teacher ${teacher} not found` });
  } else {
    const input: object = {
      teacher_id: isTeacherExists[0].id,
      message: notification
    };

    const options = {
      relate: ["teachers"],
      unrelate: ["teachers"]
    };
    try {
      const result = await Notification.createNotification(input, options);
      result && res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ message: 'An error occured while creating notification' });
    }
  }

}