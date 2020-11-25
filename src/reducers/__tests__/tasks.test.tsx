import { initializeStore } from '../../utils/redux-store';
import * as tasks from '../../actions/tasks';
import * as effects from '../../effects/tasks';
import { TaskView } from '../tasks';

jest.mock('../../effects/tasks');

const mockedEffects: jest.Mocked<typeof effects> = effects as any;

describe('Todo list reducer', () => {
  const MOCK_CREATION_DATE = '<now>';
  const MOCK_ID = '<random-id>';

  beforeEach(() => {
    mockedEffects.createTaskMetadata.mockImplementation((title) => ({
      title,
      creationDate: MOCK_CREATION_DATE,
      id: MOCK_ID,
    }));
  });

  it('appends the new todo into the list of tasks', () => {
    const store = initializeStore();

    const title = 'beat AlphaGo 52-2';
    store.dispatch(tasks.create(title));

    expect(store.getState()).toMatchObject({
      tasks: {
        [MOCK_ID]: {
          title,
          completed: false,
          editing: false,
          creationDate: MOCK_CREATION_DATE,
        },
      },
    });
  });

  it('can remove a task when instructed', () => {
    const store = initializeStore();
    store.dispatch(tasks.create('meet Ghandi'));

    store.dispatch(tasks.remove(MOCK_ID));

    expect(store.getState().tasks).toEqual({});
  });

  it('can toggle completion', () => {
    const store = initializeStore();
    store.dispatch(tasks.create('bake a pie'));

    store.dispatch(tasks.markCompleted(MOCK_ID));
    expect(store.getState().tasks[MOCK_ID]).toHaveProperty('completed', true);

    store.dispatch(tasks.markIncomplete(MOCK_ID));
    expect(store.getState().tasks[MOCK_ID]).toHaveProperty('completed', false);
  });

  it('clears completed tasks', () => {
    const store = initializeStore();

    store.dispatch(tasks.create('sleep more'));
    store.dispatch(tasks.markCompleted(MOCK_ID));
    store.dispatch(tasks.clearCompleted());

    expect(store.getState().tasks).toEqual({});
  });

  it('changes the task view when requested', () => {
    const store = initializeStore();

    store.dispatch(tasks.changeView(TaskView.Completed));
    expect(store.getState()).toHaveProperty('view', TaskView.Completed);
  });

  it('toggles task completion', () => {
    const store = initializeStore();

    store.dispatch(tasks.create('change name to Gill Bates'));

    store.dispatch(tasks.toggleCompletion());
    expect(Object.values(store.getState().tasks)).toMatchObject([
      { completed: true },
    ]);

    store.dispatch(tasks.toggleCompletion());
    expect(Object.values(store.getState().tasks)).toMatchObject([
      { completed: false },
    ]);
  });

  it('allows editing task titles', () => {
    const store = initializeStore();

    store.dispatch(tasks.create('pet the otters'));
    store.dispatch(tasks.startEditing(MOCK_ID));

    expect(store.getState().tasks[MOCK_ID]).toHaveProperty('editing', true);

    store.dispatch(tasks.finishEditing({ id: MOCK_ID, newTitle: 'run' }));
    expect(store.getState().tasks[MOCK_ID]).toMatchObject({
      editing: false,
      title: 'run',
    });
  });
});
