import { InputLabel, TextField, TextFieldProps, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface InputFieldProps extends Omit<TextFieldProps, 'name' | 'label'> {
  name: string;
  label: string;
  type?: string;
  size?: 'small' | 'medium';
  width?: string;
  readOnly?: boolean;
  id?: string;
  variant?: 'outlined' | 'standard' | 'filled';
  accept?: string;
}

const InputField = ({ name, label, type, size, width, readOnly, id, variant, accept, ...rest }: InputFieldProps) => {

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];
  const errorMessage = `${errors[name]?.message}`;

  return (
    <>
      {name === 'picture' && (
        <InputLabel htmlFor="profile-picture" sx={{ margin: 0, marginLeft: 2, fontSize: '0.75rem', fontWeight: '520' }}>
          Profile Picture
        </InputLabel>
      )}
      {name === 'document' && (
        <InputLabel htmlFor="document" sx={{ margin: 0, marginLeft: 2, fontSize: '0.75rem', fontWeight: '520' }}>
          Document
        </InputLabel>
      )}
      <TextField
        variant={variant || 'outlined'}
        id={id}
        size={size || 'small'}
        label={label}
        type={type || 'text'}
        error={hasError}
        sx={{ width: width, marginTop: name === 'picture' || name === 'document' ? 0 : 1 }}
        {...register(name)}
        InputProps={{
          readOnly: readOnly || false,
          inputProps: {
            accept: type === 'file' ? accept : undefined
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
