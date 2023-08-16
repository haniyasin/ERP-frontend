import * as yup from 'yup';

export const createSalarySchema = yup.object().shape({
  net: yup.number()
    .required("Salary is Required!")
    .positive("Must be a positive number!")
    .max(999999999, "Salary must be smaller than 9 digits!")
    .typeError("Salary must be a number"),

  gross: yup.number()
    .required("Salary is Required!")
    .positive("Must be a positive number!")
    .max(999999999, "Salary must be smaller than 9 digits!")
    .typeError("Salary must be a number"),

  startDate: yup.date()
    .required('Please select start date!'),
  
  document: yup.mixed(),
});