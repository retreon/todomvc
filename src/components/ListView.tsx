import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { RootState, TaskView } from '../reducers/tasks';
import Task from './Task';
import { Button } from './common';
import * as tasks from '../actions/tasks';
import ListFilter from './ListFilter';

interface Props {
  incompleteTasks: number;
  hasTasks: boolean;
  taskIds: Array<string>; // List of task IDs.
  clearCompletedTasks: typeof tasks.clearCompleted;
}

export function ListView({
  incompleteTasks,
  taskIds,
  clearCompletedTasks,
  hasTasks,
}: Props) {
  const pluralizedEntity = incompleteTasks === 1 ? 'item' : 'items';

  return hasTasks === false ? null : (
    <Container>
      <TaskList data-test="task-list">
        {taskIds.map((taskId) => (
          <Task id={taskId} key={taskId} />
        ))}
      </TaskList>

      <Controls data-test="task-list-toolbar">
        <RemainingTasks>
          {incompleteTasks} {pluralizedEntity} left
        </RemainingTasks>

        <ListFilter />

        <ClearCompleted
          data-test="clear-completed-tasks"
          onClick={clearCompletedTasks}
        >
          Clear completed
        </ClearCompleted>
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
  padding: var(--unit);
  color: var(--color-text-light);
  font-weight: 300;
  display: grid;
  grid-template-columns: max-content auto max-content;
`;

const RemainingTasks = styled.p`
  margin: 0;
  padding: 0 var(--unit);
`;

const ClearCompleted = styled(Button)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: inherit;
  padding: 0 var(--unit);

  :hover {
    text-decoration: underline;
  }
`;

export const mapStateToProps = (state: RootState) => {
  const tasks = Object.values(state.tasks);

  return {
    incompleteTasks: tasks.filter((task) => !task.completed).length,
    hasTasks: tasks.length > 0,
    taskIds: Object.entries(state.tasks)
      .sort(([, t1], [, t2]) => {
        return (
          new Date(t1.creationDate).getTime() -
          new Date(t2.creationDate).getTime()
        );
      })
      .filter(([, task]) => {
        return {
          [TaskView.All]: true,
          [TaskView.Active]: task.completed === false,
          [TaskView.Completed]: task.completed === true,
        }[state.view];
      })
      .map(([taskId]) => taskId),
  };
};

const mapDispatchToProps = {
  clearCompletedTasks: tasks.clearCompleted,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
