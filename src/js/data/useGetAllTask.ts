import { useQuery } from 'react-query';
import { api } from '../helpers/api';

const useGetAllTask = (skip: number, take: number) =>
  useQuery(
    ['my-task', { skip, take }],
    async () => {
      const res = await api.get('/tasks', {
        params: {
          skip,
          take,
        },
      });

      return res.data;
    },
    {
      staleTime: Infinity,
      keepPreviousData: true,
    },
  );

export default useGetAllTask;
