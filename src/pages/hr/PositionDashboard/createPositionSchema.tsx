import * as yup from "yup";

export const createPositionSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name Required!")
    .max(30, "Name must be shorter than 30 characters!"),

  description: yup.string().required("Description is Required!"),

  project: yup.string().required("Project is Required!"),

  company: yup.string().required("Company is Required!")
});
