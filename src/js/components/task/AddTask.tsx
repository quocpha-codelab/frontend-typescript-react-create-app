import { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { api } from 'js/helpers/api';
import { showErrorMessage } from 'js/helpers/error';

const AddTask = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { mutate: addTask } = useMutation(
    async (data) => {
      const res = await api.post('/tasks', data);
      return res.data;
    },
    {
      onError: (error) => {
        showErrorMessage(error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries('my-task');
        form.resetFields();
        handleClose();
      },
    },
  );

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleOpen = () => {
    setIsModalVisible(true);
  };

  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <>
      <Button onClick={handleOpen}>New</Button>

      <Modal title="New Task" visible={isModalVisible} onOk={() => form.submit()} onCancel={handleClose} okText="Add">
        <Form {...formLayout} form={form} onFinish={addTask}>
          <Form.Item name="title" label="Title" rules={[{ required: true, min: 2, max: 63 }]}>
            <Input />
          </Form.Item>

          <Form.Item name="content" label="Content" rules={[{ required: true, min: 2, max: 255 }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddTask;
