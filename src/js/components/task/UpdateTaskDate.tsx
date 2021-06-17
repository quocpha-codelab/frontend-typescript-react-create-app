import { useMutation, useQueryClient } from 'react-query';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { api } from 'js/helpers/api';
import { showErrorMessage } from 'js/helpers/error';
import dayjs from 'dayjs';
import { formatDate } from 'js/helpers/date';

interface Props {
  taskId: number;
  date: string;
}

const UpdateTaskDate = ({ taskId, date }: Props) => {
  const queryClient = useQueryClient();

  const { mutate: updateTaskDate } = useMutation(
    async (date: any) => {
      const res = await api.put(`/tasks/${taskId}/date`, {
        date: formatDate(date),
      });
      return res.data;
    },
    {
      onError: (error): void => {
        showErrorMessage(error);
      },
      onSuccess: (): void => {
        queryClient.invalidateQueries('my-task');
      },
    },
  );

  return (
    <>
      <LeftOutlined onClick={() => updateTaskDate(formatDate(dayjs(date).subtract(1, 'day')))} />
      <RightOutlined onClick={() => updateTaskDate(formatDate(dayjs(date).add(1, 'day')))} />
    </>
  );
};

export default UpdateTaskDate;
