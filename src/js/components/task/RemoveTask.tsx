import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { DeleteOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

import { api } from 'js/helpers/api';
import { showErrorMessage } from 'js/helpers/error';

interface RemoveTaskPrams {
  taskId: number;
}

const RemoveTask = ({ taskId }: RemoveTaskPrams) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: removeTask } = useMutation(
    async () => {
      const res = await api.delete(`/tasks/${taskId}`);
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    removeTask();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <DeleteOutlined type="primary" onClick={showModal} />
      <Modal title="Remove Task" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Are your sure to remove this task?</p>
      </Modal>
    </>
  );
};

export default RemoveTask;
