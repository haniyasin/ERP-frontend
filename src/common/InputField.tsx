import React from "react";
import {
  TextField,
  TextFieldProps,
  Typography
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormInputLabel } from "../styles/styled components/FormInputLabel";

interface InputFieldProps extends Omit<TextFieldProps, "name" | "label"> {
  name: string;
  label: string;
  type?: string;
  size?: "small" | "medium";
  width?: string;
  readOnly?: boolean;
  id?: string;
  variant?: "outlined" | "standard" | "filled";
  accept?: string;
}

const InputField = ({
  name,
  label,
  type,
  size,
  width,
  readOnly,
  id,
  variant,
  accept,
  ...rest
}: InputFieldProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const hasError = !!errors[name];
  const errorMessage = `${errors[name]?.message}`;

  return (
    <>
      {name === "picture" && (
        <FormInputLabel htmlFor="profile-picture">
          Profile Picture
        </FormInputLabel>
      )}
      {name === "document" && (
        <FormInputLabel htmlFor="document">Document</FormInputLabel>
      )}
      <TextField
        variant={variant || "outlined"}
        id={id}
        size={size || "small"}
        label={label}
        type={type || "text"}
        error={hasError}
        sx={{
          width: width,
          marginTop: name === "picture" || name === "document" ? 0 : 1
        }}
        {...register(name)}
        InputProps={{
          readOnly: readOnly || false,
          inputProps: {
            accept: type === "file" ? accept : undefined
          }
        }}
        {...rest}
      />
      {hasError && (
        <Typography variant="caption" color="red" marginLeft={1}>
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default InputField;
