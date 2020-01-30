import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

interface SelectComponentProps {
   changeHandler: ( e: React.ChangeEvent<{}> ) => void
   data: any
   selectedValue: any
   registeredStatus: boolean
}

const useStyles = makeStyles((theme: Theme) =>{
   createStyles({
      formControl: {
      margin: theme.spacing(1),
      width: "80%",
      minWidth: 120
      },
      chips: {
      display: "flex",
      flexWrap: "wrap"
      },
      chip: {
      margin: 2
      },
   })
});

const SelectComponent: React.FC<SelectComponentProps> = props => {
   const { data, changeHandler, selectedValue, registeredStatus } = props;
   const [ value, setValue ] = useState(undefined);
   console.log('selected teacher in Select component ', selectedValue)
   const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: 48 * 4.5 + 8,
          width: 250
        }
      }
    };

   useEffect(() => {
      setValue(undefined)
   }, [registeredStatus])

   return (
      <React.Fragment>        
            <Select
               value={selectedValue}
               onChange={(e: React.ChangeEvent<{}>) => changeHandler(e)}
               MenuProps={MenuProps}
            >
               <MenuItem value="">
               <em>Choose an existing teacher</em>
               </MenuItem>
         
               {data.map((data: any) => (
               <MenuItem value={data} key={data.id}>
                  {data.email}
               </MenuItem>
               ))}
            </Select>
      </React.Fragment>
   )
}

export default SelectComponent;