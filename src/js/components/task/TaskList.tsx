import { useMutation, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Row } from 'antd';
import { VerticalAlignMiddleOutlined } from '@ant-design/icons';

import TaskStyle from './Task.module.scss';

import TaskItem from './TaskItem';
import { showErrorMessage } from 'js/helpers/error';
import { api } from 'js/helpers/api';

interface Task {
  content: string;
  id: number;
  status: number;
  position: number;
  date: string;
}

interface TaskListProps {
  tasks: Task[];
  date: string;
  isLoading: boolean;
}

const TaskList = ({ isLoading, tasks: defaultTask, date }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTask);
  const queryClient = useQueryClient();

  const { mutate: updateTask, isLoading: loadingUpdate } = useMutation(
    async (data: any) => {
      const res = await api.put(`/tasks/${data.id}/position`, {
        position: data.position,
      });
      return res.data;
    },
    {
      onError: (error): void => {
        showErrorMessage(error);
        setTasks(defaultTask);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['my-task', { date }]);
      },
    },
  );

  useEffect(() => {
    setTasks([...defaultTask]);
  }, [defaultTask]);

  const handleUpdateTask = (startIndex: number, endIndex: number): void => {
    const newTasks = [...tasks];
    const [taskMoving] = newTasks.splice(startIndex, 1);

    // update task when local state change for better UI
    const taskId = taskMoving.id;
    const newPosition = newTasks[endIndex - 1] ? newTasks[endIndex - 1].position : newTasks[endIndex].position + 1;
    updateTask({ id: taskId, position: newPosition });

    // re order local task immediately
    newTasks.splice(endIndex, 0, taskMoving);
    setTasks(newTasks);
  };

  const onDragEnd = (result: any): void => {
    if (!result.destination || result.source.index === result.destination.index) {
      return;
    }

    handleUpdateTask(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={String(task.id)}
                index={index}
                isDragDisabled={isLoading || loadingUpdate}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={provided.draggableProps.style}
                    {...provided.draggableProps}
                    className="mb-1"
                  >
                    <Row className="flex-1" align="middle">
                      <div {...provided.dragHandleProps} className={TaskStyle.move_item}>
                        <VerticalAlignMiddleOutlined />
                      </div>
                      &nbsp;
                      <TaskItem data={task} isDragging={snapshot.isDragging} id={task.id} />
                    </Row>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
