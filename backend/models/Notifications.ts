import { Model, UpsertGraphOptions, transaction } from "objection";
import Teacher, { TeacherInterface } from "./Teacher";
import SuspendedStudent from './SuspendedStudents';

const knex = require("../db/knex");
Model.knex(knex);

export interface NotificationInterface {
  id: number;
  teacherId: number;
  message: string;
}

class Notification extends Model implements NotificationInterface {
  public static tableName = "notifications";

  public id: number;
  public teacherId: number;
  public message: string;

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
      }
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
         console.log(error)
      }
   }

   public static async retrievefornotifications(input: object, options?: UpsertGraphOptions) {
      console.log('input in teacher model: ', input);
      try {
         const result: any = await transaction(Notification, async Notification => {
            return await Notification.query()
               .upsertGraphAndFetch(input, options)
               .withGraphFetched("[teachers]")
      });
         console.log('result in retrievefornotifications: ', result);
      } catch (error) {
         console.log('Error in retrievefornotifications:', error);
      }
   }

}

export default Notification;
