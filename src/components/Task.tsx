import React from 'react';
import { connect } from 'react-redux';
import invariant from 'invariant';
import styled from 'styled-components';
import { MdClose, MdCheck } from 'react-icons/md';
import FreeformInput from 'freeform-input';

import { RootState } from '../reducers/tasks';
import * as tasks from '../actions/tasks';
import { Button } from './common';

export class Task extends React.Component<Props> {
  render() {
    const { title, completed, editing } = this.props;

    return (
      <Container>
        <StylisticCheckbox data-checked={completed} data-editing={editing}>
          <HiddenCheckbox
            data-test-id="task-completion-checkbox"
            onChange={this.toggleCompletion}
            checked={completed}
          />
          <MdCheck />
        </StylisticCheckbox>
        {editing ? (
          <EditingInput
            autoFocus
            value={title}
            onChange={this.confirmTitleChange}
            enterKeyHint="done"
            data-test-id="task-title-edit-input"
          />
        ) : (
          <Title
            data-test-id="task-title"
            data-completed={completed}
            onDoubleClick={this.editTitle}
          >
            {title}
          </Title>
        )}
        {editing === false && (
          <DeleteButton
            data-test-id="task-delete-button"
            onClick={this.removeTask}
          >
            <MdClose />
          </DeleteButton>
        )}
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

  editTitle = () => {
    this.props.startEditing(this.props.id);
  };

  confirmTitleChange = (newTitle: string) => {
    this.props.finishEditing({ id: this.props.id, newTitle });
  };
}

interface OwnProps {
  id: string;
}

interface Props extends OwnProps {
  title: string;
  completed: boolean;
  editing: boolean;
  removeTask: typeof tasks.remove;
  markCompleted: typeof tasks.markCompleted;
  markIncomplete: typeof tasks.markIncomplete;
  startEditing: typeof tasks.startEditing;
  finishEditing: typeof tasks.finishEditing;
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
  margin-right: 0;
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

  &[data-editing='true'] {
    visibility: hidden;
  }
`;

const Title = styled.p`
  padding: calc(var(--unit) * 2) 0;
  padding-left: calc(var(--unit) * 2);
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

const EditingInput = styled(FreeformInput)`
  padding: calc(var(--unit) * 2) 0;
  padding-left: calc(var(--unit) * 2);
  color: inherit;
  font-weight: inherit;
  font-size: 1.5rem;
  box-sizing: border-box;
  outline: none;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid var(--color-divider);
  border-width: 0 1px;
  font-family: inherit;
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
    editing: task.editing,
  };
};

const mapDispatchToProps = {
  removeTask: tasks.remove,
  markCompleted: tasks.markCompleted,
  markIncomplete: tasks.markIncomplete,
  startEditing: tasks.startEditing,
  finishEditing: tasks.finishEditing,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
