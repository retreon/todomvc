import { createReducer } from 'retreon';

import * as tasks from '../actions/tasks';

export interface RootState {
  newTodo: string;
  tasks: Array<{
    title: string;
  }>;
}

export const initialState: RootState = {
  newTodo: '',
  tasks: [],
};

export default createReducer(initialState, (handleAction) => [
  handleAction(tasks.updateTitle, (state, title) => {
    state.newTodo = title;
  }),

  handleAction(tasks.submit, (state) => {
    state.tasks.push({ title: state.newTodo });
    state.newTodo = '';
  }),
]);
