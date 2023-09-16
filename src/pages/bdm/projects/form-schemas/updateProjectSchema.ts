import * as yup from "yup";

export const updateProjectSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is Required!")
    .max(50, "Name must be shorter than 50 characters"),

  description: yup.string().required("Description is Required!"),

  company: yup.string().required("Company is Required!")
});
