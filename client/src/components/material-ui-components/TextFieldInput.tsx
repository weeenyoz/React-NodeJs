import React from "react";
import TextField from "@material-ui/core/TextField";

interface TextFieldInputComponentProps {
  label: string;
  variant?: any;
  type?: string;
  rowsMax?: string;
  changeHandler: (value: any) => void;
  value: any;
  isMulti: boolean
}

const TextFieldInputComponent: React.FC<TextFieldInputComponentProps> = (props) => {
  const { label, variant, type, rowsMax, isMulti, changeHandler, value } = props;

  return (
    <TextField
      label={label}
      variant={variant}
      type={type}
      rowsMax={rowsMax && rowsMax}
      onChange={(e: React.ChangeEvent<{ value: any }>) => changeHandler(e.target.value)}
      value={value}
      multiline={isMulti}
    />
  );
};

export default TextFieldInputComponent;
