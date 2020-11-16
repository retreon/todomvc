import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { RootState } from '../reducers/tasks';
import * as tasks from '../actions/tasks';

interface Props {
  title: string;
  updateTitle: typeof tasks.updateTitle;
  createTask: typeof tasks.create;
}

export class TaskInput extends React.Component<Props> {
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
    this.props.createTask();
  };
}

const Input = styled.input`
  width: 100%;
  border: none;
  background: var(--color-neutral);
  padding: calc(var(--unit) * 2);
  font-size: calc(var(--unit) * 3);
  color: inherit;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);

  :focus {
    outline: none;
  }

  ::placeholder {
    font-style: italic;
    font-weight: 200;
    color: var(--color-text-lighter);
    opacity: 25%;
  }
`;

const mapStateToProps = (state: RootState) => ({
  title: state.newTaskTitle,
});

const mapDispatchToProps = {
  updateTitle: tasks.updateTitle,
  createTask: tasks.create,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskInput);
