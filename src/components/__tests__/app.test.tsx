import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

describe('App', () => {
  function setup<Props>(overrides?: Props) {
    const props = {
      ...overrides,
    };

    return {
      output: shallow(<App {...props} />),
      props,
    };
  }

  it('renders', () => {
    expect(setup).not.toThrow();
  });
});
