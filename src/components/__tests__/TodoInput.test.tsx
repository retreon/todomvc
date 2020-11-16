import React from 'react';
import { shallow } from 'enzyme';

import { TodoInput } from '../TodoInput';

describe('TodoInput', () => {
  function setup<Props>(overrides?: Props) {
    const props = {
      title: 'invent another dimension',
      updateTitle: jest.fn(),
      submit: jest.fn(),
      ...overrides,
    };

    const output = shallow(<TodoInput {...props} />);

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
    const { findByTestId, props } = setup();

    findByTestId('new-todo-form').simulate('submit', new Event('submit'));

    expect(props.submit).toHaveBeenCalled();
  });
});
