import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { RootState } from '../reducers/todos';
import * as todos from '../actions/todos';

interface Props {
  title: string;
  updateTitle: typeof todos.updateTitle;
  submit: typeof todos.submit;
}

export class TodoInput extends React.Component<Props> {
  render() {
    return (
      <form data-test-id="new-todo-form" onSubmit={this.appendTodo}>
        <Input
          data-test-id="new-todo-input"
          value={this.props.title}
          autoFocus
          placeholder="What needs to be done?"
          onInput={this.updateInputContent}
        />
      </form>
    );
  }

  updateInputContent = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.updateTitle(event.currentTarget.value);
  };

  appendTodo = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();
    this.props.submit();
  };
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

const mapStateToProps = (state: RootState) => ({
  title: state.newTodo,
});

const mapDispatchToProps = {
  updateTitle: todos.updateTitle,
  submit: todos.submit,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
