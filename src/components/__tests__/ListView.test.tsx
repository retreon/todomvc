import React from 'react';
import { shallow } from 'enzyme';

import { ListView, mapStateToProps } from '../ListView';
import { initialState } from '../../reducers/tasks';

describe('ListView', () => {
  function setup<Props>(overrides?: Props) {
    const props = {
      incompleteTasks: 5,
      ...overrides,
    };

    return {
      output: shallow(<ListView {...props} />),
      props,
    };
  }

  it('shows how many tasks are remaining', () => {
    const { output: plural } = setup({ incompleteTasks: 5 });
    const { output: singular } = setup({ incompleteTasks: 1 });
    const { output: empty } = setup({ incompleteTasks: 0 });

    expect(plural.text()).toMatch(/5 items left/);
    expect(singular.text()).toMatch(/1 item left/);
    expect(empty.text()).toMatch(/0 items left/);
  });

  describe('mapStateToProps', () => {
    it('returns the task count', () => {
      const state = mapStateToProps(initialState);

      expect(state).toHaveProperty('incompleteTasks', 0);
    });
  });
});
