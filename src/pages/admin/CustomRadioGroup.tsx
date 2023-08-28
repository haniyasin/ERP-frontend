import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface RadioGroupProps {
  name: string;
  label: string;
  defaultValue?: string;
  disabled?: boolean;
}

const CustomRadioGroup = ({
  name,
  label,
  defaultValue,
  disabled
}: RadioGroupProps) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const hasError = !!errors[name];
  const errorMessage = `${errors[name]?.message}`;

  return (
    <FormControl error={hasError} sx={{ margin: "0 auto", marginTop: 1 }}>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue || null}
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            row
            value={value}
            onChange={onChange}
            sx={{ margin: "0 auto" }}
          >
            <FormControlLabel
              value="true"
              control={<Radio size="small" disabled={disabled || false} />}
              label="Yes"
            />
            <FormControlLabel
              value="false"
              control={<Radio size="small" disabled={disabled || false} />}
              label="No"
            />
          </RadioGroup>
        )}
      />
      {hasError && (
        <Typography variant="caption" color="red" marginLeft={1}>
          {errorMessage}
        </Typography>
      )}
    </FormControl>
  );
};

export default CustomRadioGroup;
