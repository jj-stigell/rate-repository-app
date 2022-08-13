import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { Button, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATEREVIEW } from '../graphql/mutations';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
}

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
    repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .typeError("Please enter a valid number")
    .required('Rating is required')
    .min(0, "Minimum atleast 0")
    .max(100, "Allowed maximum is 100"), 
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

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" style={styles.input} />
      <FormikTextInput name="repositoryName" placeholder="Repository name" style={styles.input} />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" style={styles.input} />
      <FormikTextInput name="text" placeholder="Review" style={styles.input} />
      <Button
        title={'Create a review'}
        padding="10"
        onPress={onSubmit}
      />
    </View>
  );
};

export const ReviewContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();
  const [postReview, result] = useMutation(CREATEREVIEW);

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    
    try {
      await postReview({ variables: {
        input: {
          "repositoryName": repositoryName,
          "ownerName": ownerName,
          "rating": parseInt(rating),
          "text": text
        }
      }});
      if (result) {
        navigate(`/repo/${ownerName}.${repositoryName}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
