import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';

import * as tasks from '../actions/tasks';
import { TaskView, RootState } from '../reducers/tasks';

interface Props {
  activeFilter: TaskView;
  changeTaskView: typeof tasks.changeView;
}

export class ListFilter extends React.Component<Props> {
  ids = {
    radioGroup: uuid(),
    [TaskView.All]: uuid(),
    [TaskView.Active]: uuid(),
    [TaskView.Completed]: uuid(),
  };

  render() {
    const options = [
      { value: TaskView.All, label: 'All' },
      { value: TaskView.Active, label: 'Active' },
      { value: TaskView.Completed, label: 'Completed' },
    ];

    return (
      <TaskFilter>
        {options.map(({ value, label }) => {
          const checked = this.props.activeFilter === value;
          return (
            <React.Fragment key={value}>
              <Radio
                id={this.ids[value]}
                name={this.ids.radioGroup}
                value={value}
                data-test={`input-radio-filter-${value}`}
                checked={checked}
                onChange={this.selectionHandlers[value]}
              />

              <RadioLabel
                data-test={`task-filter-${value}`}
                data-checked={checked}
                htmlFor={this.ids[value]}
              >
                {label}
              </RadioLabel>
            </React.Fragment>
          );
        })}
      </TaskFilter>
    );
  }

  createSelectionHandler = (view: TaskView) => () => {
    this.props.changeTaskView(view);
  };

  selectionHandlers = {
    [TaskView.All]: this.createSelectionHandler(TaskView.All),
    [TaskView.Active]: this.createSelectionHandler(TaskView.Active),
    [TaskView.Completed]: this.createSelectionHandler(TaskView.Completed),
  };
}

const TaskFilter = styled.div`
  display: flex;
  justify-content: center;
`;

const Radio = styled.input.attrs({ type: 'radio' })`
  display: none;
`;

const RadioLabel = styled.label`
  border: 1px solid transparent;
  border-radius: 3px;
  padding: 0 var(--unit);
  margin: 0 calc(var(--unit) / 2);

  &[data-checked='true'] {
    border-color: var(--color-primary-light);
  }

  &[data-checked='false']:focus,
  &[data-checked='false']:hover {
    border-color: var(--color-primary-lighter);
  }
`;

const mapStateToProps = (state: RootState) => ({
  activeFilter: state.view,
});

const mapDispatchToProps = {
  changeTaskView: tasks.changeView,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListFilter);
