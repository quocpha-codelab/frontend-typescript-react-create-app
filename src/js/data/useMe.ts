import { useQuery } from 'react-query';
import { api } from '../helpers/api';

const useMe = () =>
  useQuery(
    'me',
    async () => {
      const res = await api.get('/auth/me');

      return res.data;
    },
    {
      staleTime: Infinity,
      cacheTime: 600000, // 10M
    },
  );

export default useMe;
