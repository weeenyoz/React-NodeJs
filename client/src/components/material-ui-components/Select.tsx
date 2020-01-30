import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';

interface SelectComponentProps {
  isMulti?: boolean;
  data: SelectFieldInterface[]
  changeHandler: (value: any) => void
  selectedValue: any
}

export interface SelectFieldInterface {
  id: number | undefined
  email: string
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: 2
    },
    noLabel: {
      marginTop: theme.spacing(3)
    }
  })
);

const SelectComponent: React.FC<SelectComponentProps> = props => {
  const classes = useStyles();
  const { isMulti, data, changeHandler, selectedValue } = props;

  return (
    <React.Fragment>
      <Select
        multiple={isMulti}
        value={selectedValue}
        onChange={(event: React.ChangeEvent<{ value: any }>) => changeHandler(event.target.value)}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
           <div className={classes.chips}>
            {
               isMulti && (selected as SelectFieldInterface[]).map((value: SelectFieldInterface) => (
                  <React.Fragment>
           
                     {console.log('selected in chip', selected)}
                     <Chip
                     key={value.id}
                     label={value.email}
                     className={classes.chip}
                     />
                  </React.Fragment>
               ))
            }
            {
               !isMulti && <Chip 
                              key={(selected as SelectFieldInterface).id} 
                              label={(selected as SelectFieldInterface).email} 
                              className={classes.chip}
                           />
            }
         </div>
       )}
        MenuProps={MenuProps}
      >
        
        {data.map((detail: any) => ( 
           <MenuItem value={detail} key={detail.id}>
            {detail.email}
          </MenuItem>
        ))}

      </Select>
    </React.Fragment>
  );
};

export default SelectComponent;
