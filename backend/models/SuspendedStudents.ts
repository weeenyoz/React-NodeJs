import { Model, UpsertGraphOptions, transaction } from "objection";
import Student from "./Student";

const knex = require("../db/knex");
Model.knex(knex);

export interface SuspendedStudentInterface {
  id: number;
  studentId: number;
}

class SuspendedStudent extends Model implements SuspendedStudentInterface {
  public static tableName = "suspended_students";

  public id: number;
  public studentId: number;

  static get jsonSchema() {
    return {
      type: "object",
      required: ["student_id"],
      properties: {
        id: { type: "integer" },
        studentId: { type: "integer" }
      }
    };
  }

  static get relationMappings() {
    return {
      students: {
        relation: Model.BelongsToOneRelation,
        modelClass: Student,
        join: {
          from: `${SuspendedStudent.tableName}.student_id`,
          to: `${Student.tableName}.id`
        }
      }
    };
  }

  public static async suspend(input: object, options?: UpsertGraphOptions) {
    try {
      const result: any = await transaction(SuspendedStudent, async SuspendedStudent => {
        return await SuspendedStudent.query()
          .insertGraphAndFetch(input, options)
          .withGraphFetched("[students]");
      });
      return result;
    } catch (error) {
      console.log(error)
    }
  }
}

export default SuspendedStudent;
