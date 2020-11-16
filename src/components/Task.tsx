import React from 'react';
import { connect } from 'react-redux';
import invariant from 'invariant';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

import { RootState } from '../reducers/tasks';
import * as tasks from '../actions/tasks';
import { Button } from './common';

interface OwnProps {
  id: string;
}

interface Props extends OwnProps {
  title: string;
  removeTask: typeof tasks.remove;
}

export class Task extends React.Component<Props> {
  render() {
    const { title } = this.props;

    return (
      <Container>
        {title}
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
}

const Container = styled.li`
  padding: calc(var(--unit) * 2);
  font-size: 1.5rem;
  font-weight: 300;
  border-bottom: 1px solid var(--color-divider);
  display: grid;
  grid-template-columns: auto min-content;

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

const DeleteButton = styled(Button)`
  color: var(--color-primary);
  font-size: calc(var(--unit) * 2.8);
  display: inline-grid;
  align-content: center;
`;

export const mapStateToProps = (state: RootState, { id }: OwnProps) => {
  const task = state.tasks[id];
  invariant(task, 'Invalid task ID.');

  return {
    title: task.title,
  };
};

const mapDispatchToProps = {
  removeTask: tasks.remove,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
