import { Model } from "objection";
import Teacher, { TeacherInterface } from "./Teacher";

const knex = require("../db/knex");
Model.knex(knex);

export interface StudentInterface {
  id: number;
  email: string;
  teachers?: TeacherInterface[];
}

class Student extends Model implements StudentInterface {
  public static tableName = "students";

  public id: number;
  public email: string;
  public teachers?: Teacher[];

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
      }
    };
  }
}

export default Student;
