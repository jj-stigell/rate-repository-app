import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { Button, View, StyleSheet } from 'react-native';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),  
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

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" style={styles.input} />
      <FormikTextInput name="password" placeholder="Password" style={styles.input} secureTextEntry={true} />
      <Button
        title={'Sign in'}
        padding="10"
        onPress={onSubmit}
      />
    </View>
  );
};

const SignIn = () => {

  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }

  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
