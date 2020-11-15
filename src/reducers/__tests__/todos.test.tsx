import { initializeStore } from '../../utils/redux-store';
import { initialState } from '../todos';

describe('Todo list reducer', () => {
  // TODO: Replace this with more meaningful tests.
  it('returns state for unknown actions', () => {
    const store = initializeStore();

    expect(store.getState()).toEqual(initialState);
  });
});
