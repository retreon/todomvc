import React from 'react';
import { shallow } from 'enzyme';

import { ListView, mapStateToProps } from '../ListView';
import { initialState, TaskView } from '../../reducers/tasks';
import Task from '../Task';

describe('ListView', () => {
  function setup<Props>(overrides?: Props) {
    const props = {
      taskIds: ['task-id-1', 'task-id-2'],
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

  it('renders each task', () => {
    const { output, props } = setup();

    expect(output.find(Task).length).toBe(props.taskIds.length);
  });

  describe('mapStateToProps', () => {
    it('returns the task count', () => {
      const state = mapStateToProps(initialState);

      expect(state).toHaveProperty('incompleteTasks', 0);
    });

    it('grabs the list of tasks', () => {
      const withTasks = {
        ...initialState,
        tasks: {
          second: {
            title: 'age another year',
            completed: true,
            creationDate: '2005',
          },
          first: {
            title: 'conquer the world',
            completed: false,
            creationDate: '2000',
          },
        },
      };

      const props = mapStateToProps(withTasks);

      expect(props.taskIds).toEqual(['first', 'second']);
    });

    it('applies the active filter', () => {
      const withTasks = {
        ...initialState,
        tasks: {
          first: {
            title: 'learn to pilot a helicopter',
            completed: false,
            creationDate: '2020',
          },
          second: {
            title: 'write yet another JS framework',
            completed: true,
            creationDate: '2019',
          },
        },
      };

      withTasks.view = TaskView.Active;
      const activeTaskProps = mapStateToProps(withTasks);

      withTasks.view = TaskView.Completed;
      const completedTaskProps = mapStateToProps(withTasks);

      expect(activeTaskProps.taskIds).toEqual(['first']);
      expect(completedTaskProps.taskIds).toEqual(['second']);
    });
  });
});
