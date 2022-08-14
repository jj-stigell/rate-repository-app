import { FlatList, StyleSheet, TextInput, View, Button } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';
import ItemSeparator from './ItemSeparator';
import {Picker} from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundLight,
  },
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
 });

const renderItem = ({ item }) => (
  <RepositoryItem repoinfo={item} />
);

const SortRepositories = ({ sortBy, setsortBy, filter, setFilter }) => {
  return(
    <View>
      <View style={styles.container}>
        <TextInput
          onChangeText={value => setFilter(value)}
          value={filter}
          style={styles.input}
          placeholder="Filter"
        />
        <Button
          title={'Clear filter'}
          color='red'
          onPress={() => setFilter('')}
        />
      </View>
      <Picker
        selectedValue={sortBy}
        onValueChange={(itemValue, itemIndex) =>
          setsortBy(itemValue)
        }>
        <Picker.Item label="Latest repositories" value="CREATED_AT.DESC" />
        <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE.DESC" />
        <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE.ASC" />
      </Picker>
    </View>
  );
}

const RepositoryList = () => {
  const { repositories, refetch } = useRepositories();
  const [ sortBy, setsortBy ] = useState("CREATED_AT.DESC");
  const [filter, setFilter] = useState('');
  const [value] = useDebounce(filter, 500);

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  useEffect(() => {
    const splitted = sortBy.split('.');
    refetch({ orderBy: splitted[0], orderDirection: splitted[1], searchKeyword: value });
  }, [sortBy, value])

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={() => <ItemSeparator styles={styles}/>}
      renderItem={renderItem}
      ListHeaderComponent={() => <SortRepositories sortBy={sortBy} setsortBy={setsortBy} filter={filter} setFilter={setFilter} />}
    />
  );
 };
 
 export default RepositoryList;
