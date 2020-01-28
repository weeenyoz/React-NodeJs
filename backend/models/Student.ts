import { Model } from "objection";
import Teacher, { TeacherInterface } from "./Teacher";
import Notification, { NotificationInterface } from "./Notifications";
import SuspendedStudent from './SuspendedStudents';

const knex = require("../db/knex");
Model.knex(knex);

export interface StudentInterface {
  id: number;
  email: string;
  is_suspended: boolean;
  teachers?: TeacherInterface[];
  notifications?: NotificationInterface[];
}

class Student extends Model implements StudentInterface {
  public static tableName = "students";

  public id: number;
  public email: string;
  public is_suspended: boolean;
  public teachers?: Teacher[];
  public notifications?: Notification[];

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],
      properties: {
        id: { type: "integer" },
        email: { type: "string", minLength: 1, maxLength: 255 }
      }
    };
  }

  static get relationMappings() {
    return {
      teachers: {
        relation: Model.ManyToManyRelation,
        modelClass: Teacher,
        join: {
          from: `${Student.tableName}.id`,
          through: {
            from: `${Teacher.teachersStudentsJoinTableName}.student_id`,
            to: `${Teacher.teachersStudentsJoinTableName}.teacher_id`
          },
          to: `${Teacher.tableName}.id`
        }
      },
      suspendedStudents: {
        relation: Model.HasOneRelation,
        modelClass: SuspendedStudent,
        join: {
          from: `${Student.tableName}.id`,
          to: `${SuspendedStudent.tableName}.student_id`
        }
      },
      notifications: {
        relation: Model.ManyToManyRelation,
        modelClass: Notification,
        join: {
          from: `${Student.tableName}.id`,
          through: {
            from: `${Notification.notificationsStudentsJoinTableName}.student_id`,
            to: `${Notification.notificationsStudentsJoinTableName}.notification_id`
          },
          to: `${Notification.tableName}.id`
        }
      },
    };
  }
}

export default Student;
