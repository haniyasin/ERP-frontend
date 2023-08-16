import * as yup from 'yup';

export const createRoleSchema = yup.object().shape({
  name: yup.string()
      .required("Role Name is Required!")
      .max(30, "Role Name must be shorter than 30 characters"),
  });