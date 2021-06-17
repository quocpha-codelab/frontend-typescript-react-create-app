import { useMutation, useQueryClient } from 'react-query';
import { CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons';

import { api } from 'js/helpers/api';
import { showErrorMessage } from 'js/helpers/error';
import TaskStatus from 'js/enums/TaskStatus';

interface Props {
  taskId: number;
  status: number;
}

const UpdateTaskStatus = ({ taskId, status }: Props) => {
  const queryClient = useQueryClient();

  const { mutate: updateTaskStatus } = useMutation(
    async () => {
      const res = await api.put(`/tasks/${taskId}/status`, {
        status: status === TaskStatus.data.OPEN ? TaskStatus.data.DONE : TaskStatus.data.OPEN,
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
      {status === TaskStatus.data.OPEN ? (
        <CheckCircleOutlined onClick={() => updateTaskStatus()} />
      ) : (
        <CheckCircleFilled onClick={() => updateTaskStatus()} />
      )}
    </>
  );
};

export default UpdateTaskStatus;
