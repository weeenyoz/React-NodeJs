import { Model, UpsertGraphOptions, transaction } from "objection";
import Student, { StudentInterface } from "./Student";

const knex = require("../db/knex");
Model.knex(knex);

export interface TeacherInterface {
  id: number;
  email: string;
  students?: StudentInterface[];
}

class Teacher extends Model implements TeacherInterface {
  public static tableName = "teachers";
  public static teachersStudentsJoinTableName = "teachers_students";

  public id: number;
  public email: string;
  public students?: Student[];

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
      }
    };
  }

  public static async register(input: object, options?: UpsertGraphOptions) {
    console.log('** Input in Model **', input)
    try {
      const result: any = await transaction(Teacher, async Teacher => {
        return await Teacher.query()
          .upsertGraphAndFetch(input, options)
          .withGraphFetched('[students]');
      });
      return result;
    } catch (error) {
      console.log('** Error from Model **', error);
    }
  }
}

export default Teacher;
