import * as yup from "yup";

export const createEmployeeDocumentSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is Required!")
    .max(40, "Names must be shorter than 40 characters"),

  document: yup.mixed()
});
