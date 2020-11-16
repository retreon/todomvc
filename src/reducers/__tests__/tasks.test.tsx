import { initializeStore } from '../../utils/redux-store';
import * as tasks from '../../actions/tasks';

describe('Todo list reducer', () => {
  it('updates the new todo title when instructed', () => {
    const store = initializeStore();

    const title = 'pet the otters';
    store.dispatch(tasks.updateTitle(title));

    expect(store.getState()).toHaveProperty('newTodo', title);
  });

  it('appends the new todo into the list of tasks', () => {
    const store = initializeStore();

    const title = 'beat AlphaGo 52-2';
    store.dispatch(tasks.updateTitle(title));
    store.dispatch(tasks.submit());

    expect(store.getState()).toMatchObject({
      newTodo: '',
      tasks: [{ title }],
    });
  });
});
