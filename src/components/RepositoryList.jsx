import { FlatList, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';
import ItemSeparator from './ItemSeparator';

const styles = StyleSheet.create({
   separator: {
     height: 10,
     backgroundColor: theme.colors.backgroundLight,
   },
 });

const renderItem = ({ item }) => (
  <RepositoryItem repoinfo={item} />
);
 
const RepositoryList = () => {
  const { repositories } = useRepositories();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={() => <ItemSeparator styles={styles}/>}
      renderItem={renderItem}
    />
  );
 };
 
 export default RepositoryList;
