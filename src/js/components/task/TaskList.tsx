import { Table, Button, Tag } from 'antd';
import TaskStatus from 'js/enums/TaskStatus';

interface Task {
  title: string;
  content: string;
  id: number;
  status: number;
}

interface Props {
  isLoading: boolean;
  tasks: Task[] | undefined;
}

const TaskList = ({ isLoading, tasks }: Props) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Content',
      dataIndex: 'content',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: number) => {
        const color = status === TaskStatus.getValue('OPEN') ? 'volcano' : 'green';
        return (
          <Tag color={color} key={status}>
            {TaskStatus.getTitle(status)}
          </Tag>
        );
      },
    },

    {
      title: 'Actions',
      render: () => {
        return (
          <>
            <Button>Edit</Button>
            &nbsp;
            <Button>Remove</Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Table rowKey="id" dataSource={tasks || []} columns={columns} pagination={false} loading={isLoading} />
    </div>
  );
};

export default TaskList;
