import { initializeStore } from '../../utils/redux-store';
import * as todos from '../../actions/todos';

describe('Todo list reducer', () => {
  it('updates the new todo title when instructed', () => {
    const store = initializeStore();

    const title = 'pet the otters';
    store.dispatch(todos.updateTitle(title));

    expect(store.getState()).toHaveProperty('newTodo', title);
  });

  it('appends the new todo into the list of todos', () => {
    const store = initializeStore();

    const title = 'beat AlphaGo 52-2';
    store.dispatch(todos.updateTitle(title));
    store.dispatch(todos.submit());

    expect(store.getState()).toMatchObject({
      newTodo: '',
      todos: [{ title }],
    });
  });
});
