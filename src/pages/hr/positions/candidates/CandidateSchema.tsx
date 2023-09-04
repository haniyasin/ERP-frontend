import * as yup from "yup";

export const candidateSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is Required!")
    .max(30, "Name must be shorter than 30 characters"),

  appliedOn: yup.string().required("Applied on is Required!"),

  acceptedOn: yup.string(),

  status: yup
    .string()
    .required("Status is Required!")
    .max(10, "Status can't exceed 10 characters!"),

  cv: yup.mixed().required("CV is Required!")
});
