import React from 'react';
import { shallow } from 'enzyme';

import { TodoInput } from '../TodoInput';

describe('TodoInput', () => {
  function setup<Props>(overrides?: Props) {
    const props = {
      ...overrides,
    };

    return {
      output: shallow(<TodoInput {...props} />),
      props,
    };
  }

  it('renders', () => {
    expect(setup).not.toThrow();
  });
});
