import React from 'react';
import styled from 'styled-components';

export class TodoInput extends React.Component {
  render() {
    return <Input autoFocus placeholder="What needs to be done?" />;
  }
}

const Input = styled.input`
  width: 100%;
  border: none;
  background: var(--color-neutral);
  padding: calc(var(--unit) * 2);
  font-size: calc(var(--unit) * 3);
  color: inherit;

  :focus {
    outline: none;
  }

  ::placeholder {
    font-style: italic;
    font-weight: 200;
    color: var(--color-text-light);
    opacity: 25%;
  }
`;

export default TodoInput;
