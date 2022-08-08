import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { Button, View, StyleSheet } from 'react-native';

const initialValues = {
  username: '',
  password: '',
}

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
      <FormikTextInput name="pasword" placeholder="Password" style={styles.input} secureTextEntry={true} />
      <Button
        title={'Sign in'}
        padding="10"
        onPress={onSubmit}
      />
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => {
    const username = values.username;
    const password = values.pasword;
    console.log(`Values are username: ${username} and password: ${password}`);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
