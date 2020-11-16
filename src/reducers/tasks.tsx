import { createReducer } from 'retreon';

import * as tasks from '../actions/tasks';

export interface RootState {
  newTaskTitle: string;
  tasks: {
    [taskId: string]: {
      title: string;
      completed: boolean;
      creationDate: string; // ISO-8601
    };
  };
}

export const initialState: RootState = {
  newTaskTitle: '',
  tasks: {},
};

export default createReducer(initialState, (handleAction) => [
  handleAction(tasks.updateTitle, (state, title) => {
    state.newTaskTitle = title;
  }),

  handleAction(tasks.create, (state, { id, creationDate }) => {
    state.tasks[id] = {
      title: state.newTaskTitle,
      completed: false,
      creationDate,
    };

    state.newTaskTitle = '';
  }),

  handleAction(tasks.remove, (state, id) => {
    delete state.tasks[id];
  }),

  handleAction(tasks.markCompleted, (state, id) => {
    state.tasks[id].completed = true;
  }),

  handleAction(tasks.markIncomplete, (state, id) => {
    state.tasks[id].completed = false;
  }),

  handleAction(tasks.clearCompleted, (state) => {
    Object.entries(state.tasks).forEach(([id, task]) => {
      if (task.completed) delete state.tasks[id];
    });
  }),
]);
