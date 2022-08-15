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
  const variables = { id, first: 4 };
  const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: variables
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

  const onEndReach = () => {
    const canFetchMore = !loading && repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewCard review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <ItemSeparator styles={styles}/>}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
