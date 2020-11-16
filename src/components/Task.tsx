import React from 'react';
import { connect } from 'react-redux';
import invariant from 'invariant';
import styled from 'styled-components';
import { MdClose, MdCheck } from 'react-icons/md';

import { RootState } from '../reducers/tasks';
import * as tasks from '../actions/tasks';
import { Button } from './common';

interface OwnProps {
  id: string;
}

interface Props extends OwnProps {
  title: string;
  completed: boolean;
  removeTask: typeof tasks.remove;
  markCompleted: typeof tasks.markCompleted;
  markIncomplete: typeof tasks.markIncomplete;
}

export class Task extends React.Component<Props> {
  render() {
    const { title, completed } = this.props;

    return (
      <Container>
        <StylisticCheckbox data-checked={completed}>
          <HiddenCheckbox
            data-test-id="task-completion-checkbox"
            onChange={this.toggleCompletion}
            checked={completed}
          />
          <MdCheck />
        </StylisticCheckbox>
        <Title data-completed={completed}>{title}</Title>
        <DeleteButton
          data-test-id="task-delete-button"
          onClick={this.removeTask}
        >
          <MdClose />
        </DeleteButton>
      </Container>
    );
  }

  removeTask = () => {
    this.props.removeTask(this.props.id);
  };

  toggleCompletion = () => {
    const { id, completed } = this.props;

    if (completed) {
      this.props.markIncomplete(id);
    } else {
      this.props.markCompleted(id);
    }
  };
}

const Container = styled.li`
  font-size: 1.5rem;
  font-weight: 300;
  border-bottom: 1px solid var(--color-divider);
  display: grid;
  grid-template-columns: min-content auto min-content;
  align-items: center;

  button {
    opacity: 0;
  }

  &:hover button {
    opacity: 30%;
  }

  &:hover button:hover,
  button:focus {
    opacity: 100%;
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const StylisticCheckbox = styled.label.attrs({})`
  border: 1px solid var(--color-divider);
  height: 1.75rem;
  width: 1.75rem;
  border-radius: 2em;
  margin: 0 calc(var(--unit) * 2);
  display: flex;
  align-items: center;
  justify-content: center;

  &[data-checked='true'] {
    border-color: var(--color-secondary);
    color: var(--color-secondary);
  }

  &[data-checked='false'] svg {
    visibility: hidden;
  }
`;

const Title = styled.p`
  padding: calc(var(--unit) * 2) 0;
  margin: 0;
  transition: color 100ms ease-in-out;
  overflow: hidden;
  word-wrap: break-word;
  line-height: 1.2;

  &[data-completed='true'] {
    color: var(--color-text-lighter);
    text-decoration: line-through;
  }
`;

const DeleteButton = styled(Button)`
  color: var(--color-primary);
  font-size: calc(var(--unit) * 3);
  margin: 0 calc(var(--unit) * 2);
  transition: opacity 100ms ease-in-out;
  display: flex;
`;

export const mapStateToProps = (state: RootState, { id }: OwnProps) => {
  const task = state.tasks[id];
  invariant(task, 'Invalid task ID.');

  return {
    title: task.title,
    completed: task.completed,
  };
};

const mapDispatchToProps = {
  removeTask: tasks.remove,
  markCompleted: tasks.markCompleted,
  markIncomplete: tasks.markIncomplete,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
