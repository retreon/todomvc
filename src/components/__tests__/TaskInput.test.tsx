import React from 'react';
import { shallow } from 'enzyme';

import { TaskInput } from '../TaskInput';

describe('TaskInput', () => {
  function setup<Props>(overrides?: Props) {
    const props = {
      title: 'invent another dimension',
      updateTitle: jest.fn(),
      createTask: jest.fn(),
      toggleTaskCompletion: jest.fn(),
      ...overrides,
    };

    const output = shallow(<TaskInput {...props} />);

    function findByTestId(id: string) {
      return output.find({ 'data-test-id': id });
    }

    const simulate = {
      input(input: string) {
        findByTestId('new-todo-input').simulate('input', {
          currentTarget: { value: input },
        });
      },

      submit() {
        findByTestId('new-todo-form').simulate('submit', new Event('submit'));
      },
    };

    return {
      output,
      props,
      findByTestId,
      simulate,
    };
  }

  it('updates the title when it changes', () => {
    const { simulate, findByTestId } = setup();

    const title = 'release the kraken!';
    simulate.input(title);

    expect(findByTestId('new-todo-input').prop('value')).toBe(title);
  });

  it('creates the new task', () => {
    const { props, simulate, findByTestId } = setup();

    const title = 'call mum';
    simulate.input(title);
    simulate.submit();

    expect(props.createTask).toHaveBeenCalledWith(title);
    expect(findByTestId('new-todo-input').prop('value')).toBe('');
  });

  it('does not create a task if there is only whitespace', () => {
    const { props, simulate } = setup();

    simulate.input('  \t\n\t  ');
    simulate.submit();

    expect(props.createTask).not.toHaveBeenCalled();
  });
});
