import { Model, UpsertGraphOptions, transaction } from "objection";
import Teacher, { TeacherInterface } from "./Teacher";
import Student, { StudentInterface } from './Student';

const knex = require("../db/knex");
Model.knex(knex);

export interface NotificationInterface {
  id: number;
  teacherId: number;
  message: string;
  students?: StudentInterface[];
}

class Notification extends Model implements NotificationInterface {
  public static tableName = "notifications";
  public static notificationsStudentsJoinTableName = "notifications_students";

  public id: number;
  public teacherId: number;
  public message: string;
  public students?: Student[];

  static get jsonSchema() {
    return {
      type: "object",
      required: ["teacher_id", "message"],
      properties: {
        id: { type: "integer" },
        teacherId: { type: "integer" },
        message: { type: "string", minLength: 1 }
      }
    };
  }

  static get relationMappings() {
    return {
      teachers: {
        relation: Model.BelongsToOneRelation,
        modelClass: Teacher,
        join: {
          from: `${Notification.tableName}.teacher_id`,
          to: `${Teacher.tableName}.id`
        }
      },
      students: {
         relation: Model.ManyToManyRelation,
         modelClass: Student,
         join: {
           from: `${Notification.tableName}.id`,
           through: {
             from: `${Notification.notificationsStudentsJoinTableName}.notification_id`,
             to: `${Notification.notificationsStudentsJoinTableName}.student_id`
           },
           to: `${Student.tableName}.id`
         }
      },
    };
  }

   public static async createNotification(input: object, options: UpsertGraphOptions) {
     try {
         const result: any = await transaction(Notification, async Notification => {
            return await Notification.query()
               .upsertGraphAndFetch(input, options)
               .withGraphFetched("[teachers]");
         });
         return result;
      } catch (error) {
         console.log(error);
      }
   }
}

export default Notification;
