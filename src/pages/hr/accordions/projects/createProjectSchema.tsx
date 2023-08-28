import * as yup from "yup";

export const createProjectSchema = yup.object().shape({
  id: yup.number().required("Project is Required!")
});
