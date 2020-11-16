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
});
