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
      editing: false,
      removeTask: jest.fn(),
      markCompleted: jest.fn(),
      markIncomplete: jest.fn(),
      startEditing: jest.fn(),
      finishEditing: jest.fn(),
      ...overrides,
    };

    const output = shallow(<Task {...props} />);

    function findById(id: string) {
      return output.find({ 'data-test': id });
    }

    return {
      output,
      props,
      findById,
    };
  }

  it('deletes the task when you click the delete icon', () => {
    const { findById, props } = setup();

    findById('task-delete-button').simulate('click');

    expect(props.removeTask).toHaveBeenCalledWith(props.id);
  });

  it('toggles completion on click', () => {
    const { findById, props } = setup({ completed: false });

    findById('task-completion-checkbox').simulate('change', {
      currentTarget: { value: true },
    });
    expect(props.markCompleted).toHaveBeenCalledWith(props.id);

    findById('task-completion-checkbox').simulate('change', {
      currentTarget: { value: false },
    });
    expect(props.markCompleted).toHaveBeenCalledWith(props.id);
  });

  it('starts edit mode when you double click the title', () => {
    const { findById, props } = setup();

    findById('task-title').simulate('doubleClick');

    expect(props.startEditing).toHaveBeenCalledWith(props.id);
  });

  it('shows an input while editing', () => {
    const { findById, props } = setup({ editing: true });

    expect(findById('task-title-edit-input').prop('value')).toBe(props.title);
  });

  it('confirms the edits when you finish', () => {
    const { findById, props } = setup({ editing: true });

    const newTitle = 'assume the identity of Nathan Fillion';
    findById('task-title-edit-input').simulate('change', newTitle);

    expect(props.finishEditing).toHaveBeenCalledWith({
      id: props.id,
      newTitle,
    });
  });

  it('hides the delete button while editing', () => {
    const { findById } = setup({ editing: true });

    expect(findById('task-delete-button').exists()).toBe(false);
  });

  describe('mapStateToProps', () => {
    it('grabs necessary state', () => {
      const withTask = {
        ...initialState,
        tasks: {
          mockId: {
            title: 'win the lottery',
            completed: false,
            editing: false,
            creationDate: '',
          },
        },
      };

      const state = mapStateToProps(withTask, { id: 'mockId' });

      expect(state).toMatchInlineSnapshot(`
        Object {
          "completed": false,
          "editing": false,
          "title": "win the lottery",
        }
      `);
    });
  });
});
