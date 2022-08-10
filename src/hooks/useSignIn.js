import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const [authenticate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const response = await authenticate({ variables: { username, password } });
    const token = response.data.authenticate.accessToken;
    await authStorage.setAccessToken(token);
    apolloClient.resetStore();
    return { data: token };
  };

  return [signIn, result];
};

export default useSignIn;
