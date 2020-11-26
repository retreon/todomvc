import React from 'react';
import { shallow } from 'enzyme';

import { ListFilter } from '../ListFilter';
import { TaskView } from '../../reducers/tasks';

describe('ListFilter', () => {
  function setup<Props>(overrides?: Props) {
    const props = {
      activeFilter: TaskView.Active,
      changeTaskView: jest.fn(),
      ...overrides,
    };

    const output = shallow(<ListFilter {...props} />);

    function findById(id: string) {
      return output.find({ 'data-test': id });
    }

    return {
      output,
      props,
      findById,
    };
  }

  it('displays the currently selected filter', () => {
    const { findById } = setup({ activeFilter: TaskView.Completed });

    expect(findById('input-radio-filter-all').prop('checked')).toBe(false);
    expect(findById('input-radio-filter-active').prop('checked')).toBe(false);
    expect(findById('input-radio-filter-completed').prop('checked')).toBe(true);
  });

  it('updates the selected filter when changed', () => {
    const { findById, props } = setup({ activeFilter: TaskView.All });

    const event = { currentTarget: { checked: true } };
    findById('input-radio-filter-active').simulate('change', event);

    expect(props.changeTaskView).toHaveBeenCalledWith(TaskView.Active);
  });
});
