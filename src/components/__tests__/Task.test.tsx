import React from 'react';
import { shallow } from 'enzyme';

import { Task, mapStateToProps } from '../Task';
import { initialState } from '../../reducers/tasks';

describe('Task', () => {
  function setup<Props>(overrides?: Props) {
    const props = {
      id: '<task-id>',
      title: 'boil the oceans',
      completed: true,
      removeTask: jest.fn(),
      markCompleted: jest.fn(),
      markIncomplete: jest.fn(),
      ...overrides,
    };

    return {
      output: shallow(<Task {...props} />),
      props,
    };
  }

  it('deletes the task when you click the delete icon', () => {
    const { output, props } = setup();

    output.find({ 'data-test-id': 'task-delete-button' }).simulate('click');

    expect(props.removeTask).toHaveBeenCalledWith(props.id);
  });

  it('toggles completion on click', () => {
    const { output, props } = setup({ completed: false });

    output
      .find({ 'data-test-id': 'task-completion-checkbox' })
      .simulate('change', { currentTarget: { value: true } });
    expect(props.markCompleted).toHaveBeenCalledWith(props.id);

    output
      .find({ 'data-test-id': 'task-completion-checkbox' })
      .simulate('change', { currentTarget: { value: false } });
    expect(props.markCompleted).toHaveBeenCalledWith(props.id);
  });

  describe('mapStateToProps', () => {
    it('grabs necessary state', () => {
      const withTask = {
        ...initialState,
        tasks: {
          mockId: {
            title: 'win the lottery',
            completed: false,
            creationDate: '',
          },
        },
      };

      const state = mapStateToProps(withTask, { id: 'mockId' });

      expect(state).toMatchInlineSnapshot(`
        Object {
          "completed": false,
          "title": "win the lottery",
        }
      `);
    });
  });
});
