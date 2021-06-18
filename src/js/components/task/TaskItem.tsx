import { useEffect, useState, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Row, Input, Form } from 'antd';

import TaskStyle from './Task.module.scss';

import { showErrorMessage } from 'js/helpers/error';
import { api } from 'js/helpers/api';
import UpdateTaskStatus from './UpdateTaskStatus';
import RemoveTask from './RemoveTask';
import UpdateTaskDate from './UpdateTaskDate';
import { formatDate } from 'js/helpers/date';

interface Task {
  content: string;
  id: number;
  status: number;
  date: string;
}

interface TaskItemProps {
  data: Task;
  isDragging: boolean;
  id: number;
}

interface UpdateTaskContentProps {
  content: string;
}

const TaskItem = ({ data, isDragging, id }: TaskItemProps) => {
  const [form] = Form.useForm();
  const inputRef = useRef<any>(null);
  const queryClient = useQueryClient();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [content, setContent] = useState<string>(data.content);

  const { mutate: updateTask, isLoading } = useMutation(
    async (data: UpdateTaskContentProps) => {
      const res = await api.put(`/tasks/${id}/content`, data);
      return res.data;
    },
    {
      onError: (error): void => {
        showErrorMessage(error);
      },
    },
  );

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus({
        cursor: 'end',
      });
    }
  }, [isEdit]);

  const handleOpenEditContent = (): void => {
    setIsEdit(true);
  };

  const handleUpdateTask = ({ content }: UpdateTaskContentProps) => {
    setIsEdit(false);
    queryClient.setQueryData(['my-task', { date: formatDate(data.date) }], (oldData: any) => {
      const newData = { ...oldData };
      newData.tasks.forEach((task: Task) => {
        if (task.id === data.id) task.content = content;
      });
      return newData;
    });
    updateTask({ content });
  };

  return (
    <>
      <Row
        align="middle"
        className={TaskStyle.task_item}
        style={{ backgroundColor: isDragging ? 'aqua' : 'lightgrey' }}
      >
        <UpdateTaskStatus taskId={data.id} status={data.status} />
        &nbsp;
        <Row onClick={handleOpenEditContent} align="middle" className="flex-1">
          {isEdit ? (
            <Form
              form={form}
              initialValues={{ content: data.content }}
              className="full-width"
              onFinish={handleUpdateTask}
            >
              <Form.Item
                className={TaskStyle.task_item_content}
                name="content"
                rules={[
                  { required: true, message: 'Please fill this field' },
                  { min: 2, max: 255 },
                ]}
              >
                <Input
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  ref={inputRef}
                  disabled={isLoading}
                  onBlur={() => form.submit()}
                />
              </Form.Item>
            </Form>
          ) : (
            content
          )}
        </Row>
        &nbsp;
        <RemoveTask taskId={data.id} />
        <UpdateTaskDate taskId={data.id} date={data.date} />
      </Row>
    </>
  );
};

export default TaskItem;
