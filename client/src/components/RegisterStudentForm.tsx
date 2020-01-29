import React, { useState, useEffect } from "react";
import axios from 'axios';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import useRegisterStudents from '../hooks/useRegisterStudents';

interface RegisterStudentFormProps {
  data?: any;
}

export interface TeacherSelectFieldInterface {
  id: number
  email: string
}

export type StudentSelectFieldInterface = TeacherSelectFieldInterface[]

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
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: 2
    }
  })
);


const RegisterStudentForm: React.FC<RegisterStudentFormProps> = props => {
  const classes = useStyles();
  const { studentData, teacherData } = props.data;

  const [ newTeacher, setNewTeacher ] = useState<string>('');
  const [ newStudents, setNewStudents ] = useState<string[]>([]);
  
  const [ selectedTeacher, setSelectedTeacher ] = useState<TeacherSelectFieldInterface>();
  const [ selectedStudents, setSelectedStudents ] = useState<StudentSelectFieldInterface>([]);
  const { isRegistered, registerStudents } = useRegisterStudents('/api/register');
  
  let studentsInputValue: string | undefined ;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250
      }
    }
  };

  useEffect(() => {
    if (isRegistered) {
      alert('Registration Successful');
      setNewStudents([]);
      setSelectedStudents([]);
      setNewTeacher('');
      setSelectedTeacher(undefined);
      studentsInputValue = ''
    }
  }, [isRegistered]);

  const handleSelectStudentChange = (event: any) => {
    const { value } = event.target;

    const studentsToRegister = [...value];
    setSelectedStudents(studentsToRegister);
  };

  const handleSelectTeacherChange = (event: any) => {
     const { value } = event.target;

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
              
              <Select
                value={selectedTeacher}
                onChange={handleSelectTeacherChange}
              >
                <MenuItem value="">
                  <em>Choose an existing teacher</em>
                </MenuItem>
                
                { teacherData.map(( data: any ) => (
                  <MenuItem value={data} key={data.id}>
                     {data.email}
                  </MenuItem>
                ))}
              
              </Select>

            </FormControl>
          </Grid>

          {/* Select Students */}
          <Grid item xs={12} md={6}>
            <FormControl className={classes.formControl}>
              
              <InputLabel>
                Select Students
              </InputLabel>

              <Select
                value={selectedStudents}
                onChange={handleSelectStudentChange}
                multiple
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {(selected as {id: number, email: string}[]).map((value: {id: number, email: string}) => (
                      <React.Fragment>
                        <Chip
                          key={value.id}
                          label={value.email}
                          className={classes.chip}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                <MenuItem value="">
                  <em>Choose an existing student</em>
                </MenuItem>
                
                {studentData.map((data: any) => ( 
                  <MenuItem value={data} key={data.id}>
                    {data.email}
                  </MenuItem>
                ))}
              
              </Select>

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
