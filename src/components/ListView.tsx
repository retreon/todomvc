import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { RootState } from '../reducers/tasks';
import Task from './Task';

interface Props {
  incompleteTasks: number;
  taskIds: Array<string>; // List of task IDs.
}

export function ListView({ incompleteTasks, taskIds }: Props) {
  const pluralizedEntity = incompleteTasks === 1 ? 'item' : 'items';

  return (
    <Container>
      <TaskList>
        {taskIds.map((taskId) => (
          <Task id={taskId} key={taskId} />
        ))}
      </TaskList>

      <Controls>
        <RemainingTasks>
          {incompleteTasks} {pluralizedEntity} left
        </RemainingTasks>

        <TaskFilter>Pretend these are buttons</TaskFilter>

        <ClearCompleted>Clear completed</ClearCompleted>
      </Controls>
    </Container>
  );
}

const Container = styled.div`
  background: var(--color-neutral);
  border-top: 1px solid var(--color-divider);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -4px #f6f6f6,
    0 9px 1px -4px rgba(0, 0, 0, 0.2), 0 16px 0 -8px #f6f6f6,
    0 17px 2px -8px rgba(0, 0, 0, 0.2);
`;

const TaskList = styled.ol`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const Controls = styled.footer`
  padding: var(--unit) calc(var(--unit) * 2);
  color: var(--color-text-light);
  font-weight: 300;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
`;

const RemainingTasks = styled.p`
  margin: 0;
`;

const TaskFilter = styled.p`
  margin: 0;
  display: flex;
  justify-content: center;
`;

const ClearCompleted = styled.p`
  margin: 0;
  display: flex;
  justify-content: flex-end;
`;

export const mapStateToProps = (state: RootState) => {
  const tasks = Object.values(state.tasks);

  return {
    incompleteTasks: tasks.filter((task) => !task.completed).length,
    taskIds: Object.entries(state.tasks)
      .sort(([, t1], [, t2]) => {
        return (
          new Date(t1.creationDate).getTime() -
          new Date(t2.creationDate).getTime()
        );
      })
      .map(([taskId]) => taskId),
  };
};

export default connect(mapStateToProps)(ListView);
