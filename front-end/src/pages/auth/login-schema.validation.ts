import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup.string().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório')
});
