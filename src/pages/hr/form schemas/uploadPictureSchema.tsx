import * as yup from 'yup';

export const uploadPictureSchema = yup.object().shape({
    picture: yup.mixed()
      .required('Picture is required'),
  });