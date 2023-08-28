import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import { FunctionComponent, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

export type FormProps = {
  onSubmit: (data: any) => void;
  validationSchema: any; // @TODO - find type for SchemaOf<T>
  defaultValues?: any;
};

const Form: FunctionComponent<PropsWithChildren<FormProps>> = ({
  children,
  onSubmit,
  validationSchema,
  defaultValues,
  ...rest
}) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues || {}
  });

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={(event: any) => {
          event.preventDefault();
          event.stopPropagation();

          methods.handleSubmit(onSubmit)(event);
        }}
        {...rest}
        noValidate
      >
        {children}
      </Box>
    </FormProvider>
  );
};

export default Form;
