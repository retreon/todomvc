import React from 'react';
import { shallow } from 'enzyme';

import { Task, mapStateToProps } from '../Task';
import { initialState } from '../../reducers/tasks';

describe('Task', () => {
  function setup<Props>(overrides?: Props) {
    const props = {
      id: '<task-id>',
      title: 'boil the oceans',
      ...overrides,
    };

    return {
      output: shallow(<Task {...props} />),
      props,
    };
  }

  it('renders', () => {
    expect(setup).not.toThrow();
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
