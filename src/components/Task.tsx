import React from 'react';
import { connect } from 'react-redux';
import invariant from 'invariant';
import styled from 'styled-components';

import { RootState } from '../reducers/tasks';

interface OwnProps {
  id: string;
}

interface Props extends OwnProps {
  title: string;
}

export function Task(props: Props) {
  return <Container>{props.title}</Container>;
}

const Container = styled.li`
  padding: calc(var(--unit) * 2);
  font-size: 1.5rem;
  font-weight: 300;
  border-bottom: 1px solid var(--color-divider);
`;

export const mapStateToProps = (state: RootState, { id }: OwnProps) => {
  const task = state.tasks[id];
  invariant(task, 'Invalid task ID.');

  return {
    title: task.title,
  };
};

export default connect(mapStateToProps)(Task);
