import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import theme from '../theme';
import Text from './Text';
import useAuthStorage from '../hooks/useAuthStorage';
import useMe from '../hooks/useMe';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flexDirection: 'row',
  },
  tabTouchable: {
    flexGrow: 0,
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: 'white',
  },
});

const AppBarTab = ({ children, to, ...props }) => {
  const content = (
    <View style={styles.tabContainer} {...props}>
      <Text fontWeight="bold" style={styles.tabText}>
        {children}
      </Text>
    </View>
  );

  return to ? (
    <Link to={to} {...props}>
      {content}
    </Link>
  ) : (
    <Pressable {...props}>{content}</Pressable>
  );
};

const AppBar = () => {
  const { me } = useMe();
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        {me ? (
          <View>
            <AppBarTab to="/addreview">Create a review</AppBarTab>
            <AppBarTab onPress={signOut}>Sign out</AppBarTab>
          </View>
        ) : (
          <View>
            <AppBarTab to="/signin">Sign in</AppBarTab>
            <AppBarTab to="/signup">Sign up</AppBarTab>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
