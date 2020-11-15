import { initializeStore } from '../../utils/redux-store';
import * as todos from '../../actions/todos';

describe('Todo list reducer', () => {
  it('updates the new todo title when instructed', () => {
    const store = initializeStore();

    const newTitle = 'pet the otters';
    store.dispatch(todos.updateTitle(newTitle));

    expect(store.getState()).toHaveProperty('newTodo', newTitle);
  });
});
