import { Form, Input } from 'antd';
import { useMutation, useQueryClient } from 'react-query';

import { api } from 'js/helpers/api';
import { showErrorMessage } from 'js/helpers/error';

interface Props {
  date: string;
}

const AddTask = ({ date }: Props) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate: addTask } = useMutation(
    async (data: any) => {
      const res = await api.post('/tasks', {
        content: data.content,
        date,
      });
      return res.data;
    },
    {
      onError: (error): void => {
        showErrorMessage(error);
      },
      onSuccess: (): void => {
        queryClient.invalidateQueries('my-task');
        form.resetFields();
      },
    },
  );

  return (
    <Form form={form} onFinish={addTask}>
      <Form.Item
        name="content"
        rules={[
          { required: true, message: 'This field is required!' },
          { min: 2, max: 255 },
        ]}
      >
        <Input placeholder="new task" />
      </Form.Item>
    </Form>
  );
};

export default AddTask;
