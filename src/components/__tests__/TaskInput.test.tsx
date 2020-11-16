import React from 'react';
import { shallow } from 'enzyme';

import { TaskInput } from '../TaskInput';

describe('TaskInput', () => {
  function setup<Props>(overrides?: Props) {
    const props = {
      title: 'invent another dimension',
      updateTitle: jest.fn(),
      createTask: jest.fn(),
      ...overrides,
    };

    const output = shallow(<TaskInput {...props} />);

    function findByTestId(id: string) {
      return output.find({ 'data-test-id': id });
    }

    return {
      output,
      props,
      findByTestId,
    };
  }

  it('shows the new todo title', () => {
    const { findByTestId, props } = setup();

    expect(findByTestId('new-todo-input').prop('value')).toBe(props.title);
  });

  it('updates the title when it changes', () => {
    const { findByTestId, props } = setup();

    const title = 'release the kraken!';
    findByTestId('new-todo-input').simulate('input', {
      currentTarget: { value: title },
    });

    expect(props.updateTitle).toHaveBeenCalledWith(title);
  });

  it('can submit the new todo', () => {
    const { findByTestId, props } = setup({ title: 'call mum' });

    findByTestId('new-todo-form').simulate('submit', new Event('submit'));

    expect(props.createTask).toHaveBeenCalled();
  });
});
