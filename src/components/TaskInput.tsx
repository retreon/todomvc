import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { MdExpandMore } from 'react-icons/md';

import * as tasks from '../actions/tasks';
import { Button } from './common';

const PURE_WHITESPACE_REGEX = /^\s*$/;

export class TaskInput extends React.Component<Props, State> {
  state = {
    title: '',
  };

  render() {
    return (
      <Container data-test="new-todo-form" onSubmit={this.appendTodo}>
        <ToggleAllTasksCompleted onClick={this.props.toggleTaskCompletion}>
          <MdExpandMore />
        </ToggleAllTasksCompleted>

        <Input
          data-test="new-todo-input"
          value={this.state.title}
          autoFocus
          placeholder="What needs to be done?"
          onInput={this.updateInputContent}
        />
      </Container>
    );
  }

  updateInputContent = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ title: event.currentTarget.value });
  };

  appendTodo = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!PURE_WHITESPACE_REGEX.test(this.state.title)) {
      this.props.createTask(this.state.title);
      this.setState({ title: '' });
    }
  };
}

interface Props {
  createTask: typeof tasks.create;
  toggleTaskCompletion: typeof tasks.toggleCompletion;
}

interface State {
  title: string;
}

const Container = styled.form`
  display: flex;
  background: var(--color-neutral);
`;

const ToggleAllTasksCompleted = styled(Button)`
  font-size: 2.1rem;
  width: 1.75rem;
  color: var(--color-text-lightest);
  display: flex;
  align-items: center;
  margin-left: calc(var(--unit) * 2);
`;

const Input = styled.input`
  width: 100%;
  border: none;
  padding: calc(var(--unit) * 2);
  padding-left: calc(var(--unit) * 2);
  font-size: calc(var(--unit) * 3);
  color: inherit;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-weight: 300;

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

const mapDispatchToProps = {
  createTask: tasks.create,
  toggleTaskCompletion: tasks.toggleCompletion,
};

export default connect(null, mapDispatchToProps)(TaskInput);
