import Teacher from "../models/Teacher";

interface RegistrationVariables {
  teacher: { id: number; email: string } | string;
  students: Array<{ id: number; email: string }> | string[];
}

interface CreateRquestVariable<TRegistrationVariables> {
  body: TRegistrationVariables;
}

type RegistrationRequestVariable = CreateRquestVariable<RegistrationVariables>;

export const getAll = async (req: any, res: any) => {
  const teachers = await Teacher.query();
  teachers && res.send(teachers);
};

export const register = async (req: RegistrationRequestVariable, res: any) => {
  const { teacher, students } = req.body;

  const email = typeof teacher === "object" ? teacher.email : teacher;
  const id = typeof teacher === "object" ? teacher.id : undefined;

  const isTeacherExists = await Teacher.query().where("email", email);

  if (!id && isTeacherExists) {
    res.status(400).json({ message: "Teacher already exists" });
  } else {
    const input: object = {
      id,
      email,
      students: (students as Array<
        { id: number; email: string } | string
      >).map(student =>
        typeof student === "object"
          ? { id: student.id && student.id, email: student.email }
          : student
      )
    };

    const options = {
      relate: ["students"],
      unrelate: ["students"]
    };
    try {
      const result = await Teacher.register(input, options);
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  }
};
