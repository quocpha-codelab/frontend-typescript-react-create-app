import { useQuery } from 'react-query';
import { api } from '../helpers/api';

interface GetTaskParams {
  skip: number;
  take: number;
}

const useMyTasks = (params: GetTaskParams) =>
  useQuery(
    ['my-task', params],
    async () => {
      const res = await api.get('/tasks', { params });

      return res.data;
    },
    {
      staleTime: Infinity,
      keepPreviousData: true,
    },
  );

export default useMyTasks;
