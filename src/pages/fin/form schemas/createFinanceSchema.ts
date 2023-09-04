import * as yup from "yup";

export const createFinanceSchema = yup.object().shape({
  invoiceNumber: yup
    .string()
    .required("Invoice Number is Required!")
    .min(4, "Invoice number must be at least 4 characters"),

  createdAt: yup.string().required("Please select date of creation"),

  paymentType: yup
    .string()
    .required("Payment Type is Required!")
    .max(100, "Payment Type must be shorter than 100 characters!")
    .oneOf(
      ["Payable", "Receivable"],
      "Payment Type must be either 'Payable' or 'Receivable'"
    ),

  category: yup
    .string()
    .required("Category is Required!")
    .max(100, "Category must be shorter than 100 characters!"),

  client: yup
    .string()
    .required("Client is Required!")
    .max(100, "Client must be shorter than 100 characters!"),

  notes: yup
    .string()
    .required("Notes is Required!")
    .max(100, "Notes must be shorter than 100 characters!"),

  currency: yup
    .string()
    .required("Currency is Required!")
    .max(100, "Currency must be shorter than 100 characters!"),

  amountWithVat: yup
    .number()
    .required("Amount is Required!")
    .typeError("Salary must be a number"),

  amountWithoutVat: yup
    .number()
    .required("Amount is Required!")
    .typeError("Salary must be a number"),

  vat: yup
    .number()
    .required("Vat is Required!")
    .typeError("Salary must be a number"),

  dueDate: yup.string().required("Please select due date"),

  paymentMadeOn: yup.string().nullable(),

  paymentMethod: yup
    .string()
    .required("Payment Method is Required!")
    .max(100, "Payment Method must be shorter than 100 characters!")
    .oneOf(
      ["Cash", "Bank"],
      "Payment Type must be either 'Payable' or 'Receivable'"
    )
});
