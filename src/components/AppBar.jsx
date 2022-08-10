import { View, StyleSheet, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import theme from '../theme';
import useMe from '../hooks/useMe';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    paddingBottom: 30,
    paddingLeft: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

const AppBar = () => {
  const { me } = useMe();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        { !me ?
          <Link to="/signin">
            <Text style={styles.text}>Sign in</Text>
          </Link>
        :
          <TouchableWithoutFeedback onPress={() => signOut()}>
            <Text style={styles.text}>
              Sign out
            </Text>
          </TouchableWithoutFeedback>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
