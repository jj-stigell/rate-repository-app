import { FlatList, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';
import ItemSeparator from './ItemSeparator';
import {Picker} from '@react-native-picker/picker';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
   separator: {
     height: 10,
     backgroundColor: theme.colors.backgroundLight,
   },
 });

const renderItem = ({ item }) => (
  <RepositoryItem repoinfo={item} />
);

const SortRepositories = ({ sortBy, setsortBy }) => {
  return(
    <Picker
      selectedValue={sortBy}
      onValueChange={(itemValue, itemIndex) =>
        setsortBy(itemValue)
      }>
      <Picker.Item label="Latest repositories" value="CREATED_AT.DESC" />
      <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE.DESC" />
      <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE.ASC" />
    </Picker>
  );
}

const RepositoryList = () => {
  const { repositories, refetch } = useRepositories();
  const [ sortBy, setsortBy ] = useState("CREATED_AT.DESC");

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  useEffect(() => {
    const splitted = sortBy.split('.');
    refetch({ orderBy: splitted[0], orderDirection: splitted[1] });
  }, [sortBy])

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={() => <ItemSeparator styles={styles}/>}
      renderItem={renderItem}
      ListHeaderComponent={() => <SortRepositories sortBy={sortBy} setsortBy={setsortBy} />}
    />
  );
 };
 
 export default RepositoryList;
