import * as yup from "yup";

export const createPositionSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name Required!")
    .max(30, "Name must be shorter than 30 characters!"),

  project: yup
    .string()
    .required("Company is Required!")
    .max(30, "Company must be shorter than 30 characters!"),

  description: yup.string().required("Description is Required!")
});
