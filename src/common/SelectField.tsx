import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  Typography
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect } from "react";
import LoadingComponent from "./LoadingComponent";

interface SelectFieldProps extends SelectProps<string> {
  name: string;
  label: string;
  size?: "small" | "medium";
  defaultValue?: any;
  arrayData: any[];
  getArrayData?: () => void;
  isLoading?: boolean;
}

const SelectField = ({
  name,
  label,
  size = "small",
  arrayData,
  getArrayData,
  isLoading = false,
  defaultValue,
  ...rest
}: SelectFieldProps) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const hasError = !!errors[name];
  const errorMessage = `${errors[name]?.message}`;

  useEffect(() => {
    if (getArrayData) getArrayData();
    // eslint-disable-next-line
  }, []);

  if (isLoading) return <LoadingComponent modalStyle={true} />;

  return (
    <FormControl fullWidth sx={{ marginTop: 1 }}>
      <InputLabel id="label">{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select
            error={!!errors[name]}
            labelId="label"
            id="role"
            size={size}
            label={label}
            {...field}
            {...rest}
          >
            {arrayData.length > 0 &&
              arrayData.map((item: any) => (
                <MenuItem key={item?.id || item} value={item.id || item}>
                  {item.name || item}
                </MenuItem>
              ))}
          </Select>
        )}
      />
      {hasError && (
        <Typography variant="caption" color="red">
          {errorMessage}
        </Typography>
      )}
    </FormControl>
  );
};

export default SelectField;
