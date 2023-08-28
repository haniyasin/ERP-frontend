import * as yup from "yup";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../utils/constants";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email is Required!")
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
    )
});
