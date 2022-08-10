import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';

const useMe = () => {
  const [me, setMe] = useState();
  const { data, error, loading } = useQuery(GET_ME, { fetchPolicy: 'cache-and-network'});

  const fetchMe = async () => {
    if(data.me !== undefined) {
      setMe(data.me);
    }
  };

  useEffect(() => {
    fetchMe();
  }, [data]);

  return { me, loading, error, refetch: fetchMe };
};

export default useMe;
