import React, { useState, useEffect } from "react";
import { isArray } from "util";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";

interface RegisterStudentFormProps {
  data?: any;
}

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
  const [ newStudents, setNewStudents ] = useState<string[]>(['']);
  
  const [ selectedStudents, setSelectedStudents ] = useState<{id?: number, email: string}[] | string[]>([]);
  const [ selectedTeacher, setSelectedTeacher ] = useState<{id?: number, email: string} | string>('');
  
  let studentsInputVaue: string | undefined ;


  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250
      }
    }
  };

  useEffect(() => {
  }, [selectedStudents, selectedTeacher]);

  const handleStudentChange = (event: any) => {
    const { value } = event.target;

    const studentsToRegister = [...value];
    setSelectedStudents(studentsToRegister);
  };

  const handleTeacherChange = (event: any) => {
     const { value } = event.target;
     setSelectedTeacher(value);
  }

  const handleNewStudentsChange = (event: any) => {
     const { value } = event.target;

     // replaces carriage return with a space, then splits the string into array of strings
     let newStudentsToRegister = value.replace(/[\n\r]+/g, ' ').split(" ");
     setNewStudents(newStudentsToRegister);

     studentsInputVaue = newStudents.toString();
  }

  const handSubmit = (event: any) => {
   event.preventDefault();
  }

  return (
    <div>
      <form className={classes.root} onSubmit={handSubmit}>
        <Grid container>
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

          <Grid item xs={12} md={6}>
            <FormControl className={classes.formControl}>
              <TextField
                label="New Students"
                variant="outlined"
                type="email"
                multiline
                rowsMax="4"
                onChange={handleNewStudentsChange}
                value={studentsInputVaue && studentsInputVaue}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl className={classes.formControl}>
              <InputLabel>
                Select Teacher
              </InputLabel>
              <Select
                value={selectedTeacher}
                onChange={handleTeacherChange}
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

          <Grid item xs={12} md={6}>
            <FormControl className={classes.formControl}>
              <InputLabel>
                Select Students
              </InputLabel>

              <Select
                value={selectedStudents}
                onChange={handleStudentChange}
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
      </form>
    </div>
  );
};

export default RegisterStudentForm;
