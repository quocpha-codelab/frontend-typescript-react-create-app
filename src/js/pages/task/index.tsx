import { useState } from 'react';
import { Pagination, Button, Row } from 'antd';

import styles from './styles.module.scss';

import TaskList from 'js/components/task/TaskList';
import AddTask from 'js/components/task/AddTask';
import useGetAllTask from 'js/data/useGetAllTask';

const TASK_PER_PAGE = 10;

const Tasks = () => {
  const [skip, setSkip] = useState<number>(0);

  const { data, isFetching, refetch, isError } = useGetAllTask(skip, TASK_PER_PAGE);

  const handlePageChange = (page: number): void => setSkip((page - 1) * TASK_PER_PAGE);

  return (
    <div className={styles.container}>
      <div className={styles.task_container}>
        <Row justify="space-between">
          <h2>List of Task</h2>

          <Row>
            <AddTask />
            &nbsp;
            <Button onClick={() => refetch()}>Reload</Button>
          </Row>
        </Row>

        {isError && <>Something error</>}
        <TaskList isLoading={isFetching} tasks={data?.tasks} />

        <Pagination
          total={data?.total}
          pageSize={TASK_PER_PAGE}
          onChange={handlePageChange}
          showSizeChanger={false}
          disabled={isFetching}
        />
      </div>
    </div>
  );
};

export default Tasks;
