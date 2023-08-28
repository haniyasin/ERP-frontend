import * as yup from "yup";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../utils/constants";

export const registerSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full Name is Required!")
    .max(30, "Full Name must be shorter than 30 characters"),

  email: yup
    .string()
    .trim()
    .required("Email is Required!")
    .max(40, "Email Must be shorter than 40 characters!")
    .matches(EMAIL_REGEX, "Must be a valid Email!"),

  password: yup
    .string()
    .trim()
    .required("Password is Required!")
    .min(10, "Password must be between 10-16 characters!")
    .max(16, "Password must be between 10-16 characters!")
    .matches(
      PASSWORD_REGEX,
      "Must contain symbol, number and uppercase character!"
    ),

  confirmPassword: yup
    .string()
    .trim()
    .required("Confirm Password is Required!")
    .oneOf([yup.ref("password")], "Passwords do not match")
});
