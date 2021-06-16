import { useState } from 'react';
import { Button, Row, Space } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';

import styles from './styles.module.scss';

import TaskList from 'js/components/task/TaskList';
import AddTask from 'js/components/task/AddTask';
import useMyTasks from 'js/data/useMyTasks';
import { CURRENT_DATE, formatDate } from 'js/helpers/date';

const Tasks = () => {
  const [date, setDate] = useState<string>(CURRENT_DATE);
  const { data, isFetching, refetch, isError } = useMyTasks({ date: formatDate(date) });

  const previousDate = () => {
    const previous = dayjs(date).add(-1, 'day');

    setDate(formatDate(previous));
  };

  const nextDate = () => {
    const next = dayjs(date).add(1, 'day');

    setDate(formatDate(next));
  };

  return (
    <div className={styles.container}>
      <div className={styles.task_container}>
        <Row justify="center">
          <Space>
            <LeftOutlined className="pointer" onClick={previousDate} />
            <strong>{date === CURRENT_DATE ? 'Today' : date}</strong>
            <RightOutlined className="pointer" onClick={nextDate} />
          </Space>
        </Row>
        <Row justify="space-between">
          <h2>List of Task</h2>

          <Button onClick={() => refetch()}>Reload</Button>
        </Row>
        {isError && <>Something error</>}
        <AddTask date={date} />

        <TaskList tasks={data ? data.tasks : []} date={date} isLoading={isFetching} />
      </div>
    </div>
  );
};

export default Tasks;
