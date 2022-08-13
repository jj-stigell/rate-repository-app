import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { Button, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATEUSER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
  confirmation: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
    password: yup
    .string()
    .required('Password is required'),
    confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Password confirmation is required'), 
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  }
})

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" style={styles.input} />
      <FormikTextInput name="password" placeholder="Password" style={styles.input} secureTextEntry={true} />
      <FormikTextInput name="confirmation" placeholder="Password confirmation" style={styles.input} secureTextEntry={true} />
      <Button
        title={'Sign up'}
        padding="10"
        onPress={onSubmit}
      />
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const [signUp, result] = useMutation(CREATEUSER);

  const onSubmit = async (values) => {
    const { username, password } = values;
    
    try {
      await signUp({ variables: {
        input: {
          "username": username,
          "password": password,
        }
      }});
      if (result) {
        const { data } = await signIn({ username, password });
        if (data) {
          navigate('/');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
