import { createReducer } from 'retreon';

import * as todos from '../actions/todos';

export interface RootState {
  newTodo: string;
  todos: Array<{
    title: string;
  }>;
}

export const initialState: RootState = {
  newTodo: '',
  todos: [],
};

export default createReducer(initialState, (handleAction) => [
  handleAction(todos.updateTitle, (state, title) => {
    state.newTodo = title;
  }),

  handleAction(todos.submit, (state) => {
    state.todos.push({ title: state.newTodo });
    state.newTodo = '';
  }),
]);
