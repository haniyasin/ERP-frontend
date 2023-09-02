import * as yup from "yup";

export const createClientSchema = yup.object().shape({
  name: yup
    .string()
    .required("Role Name is Required!")
    .max(40, "Role Name must be shorter than 40 characters")
});
