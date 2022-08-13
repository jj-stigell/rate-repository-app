import { useParams } from 'react-router-native';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ReviewCard from './ReviewCard';
import ItemSeparator from './ItemSeparator';
import * as Linking from 'expo-linking';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundLight,
  },
});

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem repoinfo={repository} />
      <Button 
        title={'Open GitHub'}
        onPress={() => Linking.openURL(repository.url)}
      />
    </View>
  );
};

const SingleRepository = () => {
  
  const { id } = useParams();
  const { loading, error, data} = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id }
  });

  if (loading || !data.repository) {
    return (
      <View>
        {loading ? <Text>Loading...</Text> : null}
        {error ? <Text>Error: {error}</Text> : null}
      </View>
    );
  }

  const repository = data.repository;
  const reviews = data.repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewCard review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <ItemSeparator styles={styles}/>}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default SingleRepository;
