import * as yup from "yup";
import { EMAIL_REGEX } from "../../../utils/constants";

export const createEmployeeSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full Name is Required!")
    .max(30, "Full Name must be shorter than 30 characters"),

  email: yup
    .string()
    .trim()
    .required("Email is Required!")
    .max(40, "Email must be shorter than 40 characters!")
    .matches(EMAIL_REGEX, "Must be a valid Email!"),

  title: yup
    .string()
    .required("Title is Required!")
    .max(40, "Title must be shorter than 40 characters!"),

  departments: yup.array().required("Departments is Required!"),

  isContractor: yup
    .boolean()
    .required("Please select an option for contractor"),

  startingDate: yup.string().required("Please select starting date"),

  picture: yup.mixed().required("Picture is required"),

  net: yup
    .number()
    .required("Salary is Required!")
    .positive("Must be a positive number!")
    .max(999999999, "Salary must be smaller than 9 digits!")
    .typeError("Salary must be a number"),

  gross: yup
    .number()
    .required("Salary is Required!")
    .positive("Must be a positive number!")
    .max(999999999, "Salary must be smaller than 9 digits!")
    .typeError("Salary must be a number"),

  startDate: yup.string().required("Please select start date!"),

  document: yup.mixed()
});
