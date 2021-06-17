import { useEffect, useState, useRef } from 'react';
import { useMutation } from 'react-query';
import { Row, Input, Form } from 'antd';
import { CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons';

import TaskStyle from './Task.module.scss';

import TaskStatus from 'js/enums/TaskStatus';
import { showErrorMessage } from 'js/helpers/error';
import { api } from 'js/helpers/api';

interface Task {
  content: string;
  id: number;
  status: number;
}

interface TaskItemProps {
  data: Task;
  isDragging: boolean;
  id: number;
}

const TaskItem = ({ data, isDragging, id }: TaskItemProps) => {
  const [form] = Form.useForm();
  const inputRef = useRef<any>(null);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [content, setContent] = useState<string>(data.content);

  const { mutate: updateTask, isLoading } = useMutation(
    async (data) => {
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

  const handleUpdateTask = (data: any) => {
    setIsEdit(false);
    updateTask(data);
  };

  const renderIcon = () => {
    switch (data.status) {
      case TaskStatus.data.OPEN:
        return <CheckCircleFilled />;
      case TaskStatus.data.DONE:
        return <CheckCircleOutlined />;
      default:
        return null;
    }
  };

  return (
    <>
      <Row
        align="middle"
        className={TaskStyle.task_item}
        style={{ backgroundColor: isDragging ? 'aqua' : 'lightgrey' }}
      >
        {renderIcon()}
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
      </Row>
    </>
  );
};

export default TaskItem;
