import { useParams } from 'react-router-native';
import { View, Text, Button } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import * as Linking from 'expo-linking';

const ShowRepo = () => {
  const { id } = useParams();
  const { loading, error, data} = useQuery(GET_REPOSITORY, {
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

  return (
    <View>
      <RepositoryItem repoinfo={data.repository} />
      <Button 
        title={'Open GitHub'}
        onPress={() => Linking.openURL(data.repository.url)}
      />
    </View>
  );
}

export default ShowRepo;
