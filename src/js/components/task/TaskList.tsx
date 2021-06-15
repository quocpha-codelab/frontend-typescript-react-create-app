import { Col, Button, Row } from 'antd';
import { CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons';
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

interface TaskItemProps {
  data: Task;
}

const TaskItem = ({ data }: TaskItemProps) => {
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
    <Row>
      {renderIcon()}
      &nbsp;
      <div>{data.content}</div>
    </Row>
  );
};

const TaskList = ({ isLoading, tasks }: Props) => {
  return (
    <div>
      {tasks?.map((task) => (
        <TaskItem data={task} />
      ))}
    </div>
  );
};

export default TaskList;
