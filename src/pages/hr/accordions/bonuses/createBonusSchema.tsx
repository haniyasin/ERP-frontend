import * as yup from "yup";

export const createBonusSchema = yup.object().shape({
  type: yup
    .string()
    .required("Bonus Type is Required!")
    .max(20, "Bonus Type must be shorter than 20 characters"),

  date: yup.string().required("Please select date!"),

  amount: yup
    .number()
    .required("Amount is Required!")
    .positive("Must be a positive number!")
    .max(999999999, "Amount must be smaller than 9 digits!")
    .typeError("Amount must be a number")
});
