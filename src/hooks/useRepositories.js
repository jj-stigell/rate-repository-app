import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, { 
    variables: { orderBy: "CREATED_AT", orderDirection: "DESC" },
    fetchPolicy: 'cache-and-network',
  });

  const fetchRepositories = async () => {
    if(data.repositories !== undefined) {
      setRepositories(data.repositories);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, [data]);

  return { repositories, loading, error, refetch, fetchRepositories };
};

export default useRepositories;
