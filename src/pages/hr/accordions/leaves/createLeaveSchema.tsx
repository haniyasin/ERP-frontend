import * as yup from 'yup';

export const createLeaveSchema = yup.object().shape({
  type: yup.string()
    .required("Leave Type is Required!")
    .max(20, "Leave Type must be shorter than 20 characters"),

  startDate: yup.string()
    .required('Please select start date!'),

  endDate: yup.string()
    .required('Please select end date!'),
  
  document: yup.mixed(),
});