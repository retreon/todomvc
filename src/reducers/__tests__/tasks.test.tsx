import { initializeStore } from '../../utils/redux-store';
import * as tasks from '../../actions/tasks';
import * as effects from '../../effects/tasks';

jest.mock('../../effects/tasks');

const mockedEffects: jest.Mocked<typeof effects> = effects as any;

describe('Todo list reducer', () => {
  const MOCK_CREATION_DATE = '<now>';
  const MOCK_ID = '<random-id>';

  beforeEach(() => {
    mockedEffects.createTaskMetadata.mockReturnValue({
      creationDate: MOCK_CREATION_DATE,
      id: MOCK_ID,
    });
  });

  it('updates the new todo title when instructed', () => {
    const store = initializeStore();

    const title = 'pet the otters';
    store.dispatch(tasks.updateTitle(title));

    expect(store.getState()).toHaveProperty('newTaskTitle', title);
  });

  it('appends the new todo into the list of tasks', () => {
    const store = initializeStore();

    const title = 'beat AlphaGo 52-2';
    store.dispatch(tasks.updateTitle(title));
    store.dispatch(tasks.create());

    expect(store.getState()).toMatchObject({
      newTaskTitle: '',
      tasks: {
        [MOCK_ID]: {
          title,
          completed: false,
          creationDate: MOCK_CREATION_DATE,
        },
      },
    });
  });

  it('can remove a task when instructed', () => {
    const store = initializeStore();

    store.dispatch(tasks.updateTitle('meet Ghandi'));
    store.dispatch(tasks.create());

    const [id] = Object.keys(store.getState().tasks);
    store.dispatch(tasks.remove(id));

    expect(store.getState().tasks).toEqual({});
  });

  it('can toggle completion', () => {
    const store = initializeStore();

    store.dispatch(tasks.updateTitle('bake a pie'));
    store.dispatch(tasks.create());

    const [id] = Object.keys(store.getState().tasks);
    store.dispatch(tasks.markCompleted(id));
    expect(store.getState().tasks[id]).toHaveProperty('completed', true);

    store.dispatch(tasks.markIncomplete(id));
    expect(store.getState().tasks[id]).toHaveProperty('completed', false);
  });

  it('clears completed tasks', () => {
    const store = initializeStore();

    store.dispatch(tasks.updateTitle('sleep more'));
    store.dispatch(tasks.create());

    const [id] = Object.keys(store.getState().tasks);
    store.dispatch(tasks.markCompleted(id));
    store.dispatch(tasks.clearCompleted());

    expect(store.getState().tasks).toEqual({});
  });
});
