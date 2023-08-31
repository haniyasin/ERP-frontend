import * as yup from "yup";
import { EMAIL_REGEX } from "../../../utils/constants";

export const createFinanceSchema = yup.object().shape({
  invoiceNumber: yup.number().required("Invoice Number must be a number"),

  amountWithVat: yup.number().required("Amount is Required!"),

  amountWithoutVat: yup.number().required("Amount is Required!"),

  vat: yup.number().required("Vat is Required!")
  // email: yup.string().trim()
  //     .required("Email is Required!")
  //     .max(40, "Email must be shorter than 40 characters!")
  //     .matches(EMAIL_REGEX, "Must be a valid Email!"),

  // title: yup.string()
  //     .required("Title is Required!")
  //     .max(40, "Title must be shorter than 40 characters!"),

  // departments: yup.array()
  //     .required("Departments is Required!"),

  // salary: yup.number()
  //     .required("Salary is Required!")
  //     .positive("Must be a positive number!")
  //     .max(999999999, "Salary must be smaller than 9 digits!")
  //     .typeError("Salary must be a number"),

  // role: yup.string()
  //     .required("Role is Required!"),

  // isContractor: yup.boolean()
  //     .required('Please select an option for contractor'),

  // startingDate: yup.string()
  //     .required('Please select starting date'),

  // picture: yup.mixed()
  //     .required('Picture is required'),
});
