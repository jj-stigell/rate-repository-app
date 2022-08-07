import { Text } from 'react-native';

const RepositoryItem = ({ repoinfo }) => {
  return (
    <Text>
      Full name: {repoinfo.fullName}
      {"\n"}
      Description: {repoinfo.description}
      {"\n"}
      Language: {repoinfo.language}
      {"\n"}
      Starts: {repoinfo.stargazersCount}
      {"\n"}
      Forks: {repoinfo.forksCount}
      {"\n"}
      Reviews: {repoinfo.reviewCount}
      {"\n"}
      Rating: {repoinfo.ratingAverage}
    </Text>
  );
};

export default RepositoryItem;