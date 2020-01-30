import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import useRegisterStudents from '../hooks/useRegisterStudents';
import SelectComponent, { SelectFieldInterface } from './material-ui-components/Select';

interface RegisterStudentFormProps {
  studentData: any;
  teacherData: any;
}

type TeacherSelectFieldInterface = SelectFieldInterface
type StudentSelectFieldInterface = SelectFieldInterface[]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1)
      },
      color: "#01140d"
    },
    formControl: {
      margin: theme.spacing(1),
      width: "80%",
      minWidth: 120
    },
  })
);


const RegisterStudentForm: React.FC<RegisterStudentFormProps> = props => {
  const classes = useStyles();
  const { studentData, teacherData } = props;

  const [ newTeacher, setNewTeacher ] = useState<string>('');
  const [ newStudents, setNewStudents ] = useState<string[]>([]);
  
  const [ selectedTeacher, setSelectedTeacher ] = useState<TeacherSelectFieldInterface>();
  const [ selectedStudents, setSelectedStudents ] = useState<StudentSelectFieldInterface>([]);
  const { isRegistered, registerStudents } = useRegisterStudents('/api/register');
  
  let studentsInputValue: string | undefined ;

  useEffect(() => {
    if (isRegistered) {
      alert('Registration Successful');
      setNewStudents([]);
      setSelectedStudents([]);
      setNewTeacher('');
      setSelectedTeacher({id: undefined, email: ''});
      studentsInputValue = ''
    }
  }, [isRegistered]);

  const handleSelectStudentChange = (value: any) => {
    const studentsToRegister = [...value];
    setSelectedStudents(studentsToRegister);
  }

  const handleSelectTeacherChange = (value: any) => {
    setSelectedTeacher(value);
  }

  const handleNewStudentsChange = (event: any) => {
     const { value } = event.target;

     // replaces carriage return with a space, then splits the string into an array of strings
     let newStudentsToRegister = value.replace(/[\n\r]+/g, ' ').split(" ");
     setNewStudents(newStudentsToRegister);

     studentsInputValue = newStudents.toString();
  }

  const handSubmit = async (event: any) => {
   event.preventDefault();

   let teacher: string | TeacherSelectFieldInterface | undefined;

   if (newTeacher && !selectedTeacher) {
     teacher = newTeacher;
   } else if (selectedTeacher && !newTeacher) {
     teacher = selectedTeacher;
   }

   let students: Array<string | {id?: number, email: string}> | undefined;
   if ( newStudents.length > 0 && selectedStudents.length > 0 ) {
     students = [...newStudents,...selectedStudents];
   } 
   else if ( newStudents.length > 0 ) {
     students = [...newStudents];
   } 
   else if ( selectedStudents.length > 0 ) {
     students = [...selectedStudents];
   }

   let payload = {
     teacher,
     students
   }

   registerStudents(payload);
  }

  return (
    <div>
      <form className={classes.root} onSubmit={handSubmit}>
        <Grid container>

          {/* New Teacher Input */}
          <Grid item xs={12} md={6}>
            <FormControl className={classes.formControl}>
              
              <TextField
                id="outlined-basic"
                label="New Teacher"
                variant="outlined"
                type="email"
                onChange={(e: any) => setNewTeacher(e.target.value)}
                value={newTeacher}
              />
            
            </FormControl>
          </Grid>

          {/* New Students Input */}
          <Grid item xs={12} md={6}>
            <FormControl className={classes.formControl}>
              
              <TextField
                label="New Students"
                variant="outlined"
                type="email"
                multiline
                rowsMax="4"
                onChange={handleNewStudentsChange}
                value={studentsInputValue && studentsInputValue}
              />
            <FormHelperText>Hit Enter for a new line</FormHelperText>
            </FormControl>
          </Grid>

          {/* Select Teachers */}
          <Grid item xs={12} md={6}>
            <FormControl className={classes.formControl}>
              
              <InputLabel>
                Select Teacher
              </InputLabel>

              <SelectComponent 
                data={teacherData}
                isMulti={false}
                changeHandler={handleSelectTeacherChange}
                selectedValue={selectedTeacher}
                />

            </FormControl>
          </Grid>

          {/* Select Students */}
          <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl}>

                <InputLabel>
                  Select Students
                </InputLabel>

                <SelectComponent 
                  data={studentData}
                  isMulti={true}
                  changeHandler={handleSelectStudentChange}
                  selectedValue={selectedStudents}
                />

              </FormControl>
          </Grid>
        
        </Grid>

        <Button variant="outlined" color="primary" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterStudentForm;
