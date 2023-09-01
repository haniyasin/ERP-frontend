import { useCallback } from 'react';
import * as yup from 'yup';

export const createCompanySchema = yup.object().shape({
  name: yup.string()
      .required("Name is Required!")
      .max(30, "Name must be shorter than 30 characters"),

  description: yup.string()
      .required("Description is Required!")
      .min(10, "Description must be at least 10 characters!")
      .max(300, "Description can't be longer than 300 characters!"),

  contacts: yup.string()
      .required("Contacts are Required!"),

  employeeSize: yup.number()
      .positive("Must be a positive number")
      .required("Employee Size is Required!")
      .typeError("Must be a number")
  });

  