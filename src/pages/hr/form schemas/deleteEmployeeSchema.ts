import * as yup from "yup";

export const deleteEmployeeSchema = yup.object().shape({
  reason: yup
    .string()
    .required("Full Name is Required!")
    .max(30, "Full Name must be shorter than 30 characters")

  // document: yup.mixed()
  //   .required("Document is Required!")
});
