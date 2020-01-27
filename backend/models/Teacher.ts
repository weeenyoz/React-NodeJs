import { Model, UpsertGraphOptions, transaction } from "objection";
import Student, { StudentInterface } from "./Student";
import Notification, { NotificationInterface } from './Notifications';

const knex = require("../db/knex");
Model.knex(knex);

export interface TeacherInterface {
  id: number;
  email: string;
  students?: StudentInterface[];
  notifications?: NotificationInterface[];
}

class Teacher extends Model implements TeacherInterface {
  public static tableName = "teachers";
  public static teachersStudentsJoinTableName = "teachers_students";

  public id: number;
  public email: string;
  public students?: Student[];
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
      students: {
        relation: Model.ManyToManyRelation,
        modelClass: Student,
        join: {
          from: `${Teacher.tableName}.id`,
          through: {
            from: `${Teacher.teachersStudentsJoinTableName}.teacher_id`,
            to: `${Teacher.teachersStudentsJoinTableName}.student_id`
          },
          to: `${Student.tableName}.id`
        }
      },
      notifications: {
        relation: Model.HasManyRelation,
        modelClass: Notification,
        join: {
          from: `${Teacher.tableName}.id`,
          to: `${Notification.tableName}.teacher_id`,
        }
      }
    };
  }

  public static async register(input: object, options?: UpsertGraphOptions) {
    try {
      const result: any = await transaction(Teacher, async Teacher => {
        return await Teacher.query()
          .upsertGraphAndFetch(input, options)
          .withGraphFetched("[students]");
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Teacher;
