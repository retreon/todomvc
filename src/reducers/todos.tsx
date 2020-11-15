import { createReducer } from 'retreon';

import * as todos from '../actions/todos';

export interface RootState {
  newTodo: string;
}

export const initialState: RootState = {
  newTodo: '',
};

export default createReducer(initialState, (handleAction) => [
  handleAction(todos.updateTitle, (state, title) => {
    state.newTodo = title;
  }),
]);
