import * as tasks from '../tasks';

const CURRENT_TIME = new Date('2020-07-15T12:30Z');

jest.useFakeTimers('modern');
jest.setSystemTime(CURRENT_TIME);

describe('Task effects', () => {
  describe('create', () => {
    it('assigns an ID and creation date to the task', () => {
      const title = 'mow the astroturf';
      const task = tasks.createTaskMetadata(title);

      expect(task).toEqual({
        title,
        id: expect.any(String),
        creationDate: CURRENT_TIME.toISOString(),
      });
    });
  });
});
