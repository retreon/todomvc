import React from 'react';
import { shallow } from 'enzyme';

import { Task, mapStateToProps } from '../Task';
import { initialState } from '../../reducers/tasks';

describe('Task', () => {
  function setup<Props>(overrides?: Props) {
    const props = {
      id: '<task-id>',
      title: 'boil the oceans',
      removeTask: jest.fn(),
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
          "title": "win the lottery",
        }
      `);
    });
  });
});
