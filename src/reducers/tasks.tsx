import { createReducer } from 'retreon';

import * as tasks from '../actions/tasks';

export interface RootState {
  view: TaskView;
  tasks: {
    [taskId: string]: Task;
  };
}

export enum TaskView {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface Task {
  title: string;
  completed: boolean;
  editing: boolean;
  creationDate: string; // ISO-8601
}

export const initialState: RootState = {
  view: TaskView.All,
  tasks: {},
};

export default createReducer(initialState, (handleAction) => [
  handleAction(tasks.create, (state, { id, creationDate, title }) => {
    state.tasks[id] = {
      title,
      completed: false,
      editing: false,
      creationDate,
    };
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

  handleAction(tasks.changeView, (state, view) => {
    state.view = view;
  }),

  handleAction(tasks.toggleCompletion, (state) => {
    const tasks = Object.values(state.tasks);
    const hasIncompleteTask = tasks.some((task) => !task.completed);

    tasks.forEach((task) => {
      task.completed = hasIncompleteTask;
    });
  }),

  handleAction(tasks.startEditing, (state, taskId) => {
    state.tasks[taskId].editing = true;
  }),

  handleAction(tasks.finishEditing, (state, { id, newTitle }) => {
    state.tasks[id].editing = false;
    state.tasks[id].title = newTitle;
  }),
]);
