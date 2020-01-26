import Teacher from "../models/Teacher";

interface RegistrationVariables {
  teacher: { id: number; email: string } | string;
  students: Array<{ id: number; email: string }> | string[];
}

interface CreateRegistrationInput<TRegistrationVariables> {
  body: TRegistrationVariables
}

type RegistrationInput = CreateRegistrationInput<RegistrationVariables>

export const getAll = async (req: any, res: any) => {
  const teachers = await Teacher.query();
  teachers && res.send(teachers);
};

export const register = async (req: RegistrationInput, res: any) => {
  const { teacher, students } = req.body;

  const input: object = {
    id: typeof teacher === "object" ? teacher.id : undefined,
    email: typeof teacher === "object" ? teacher.email : teacher,
    students: (students as Array<{ id: number; email: string } | string>).map(student =>
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
};
