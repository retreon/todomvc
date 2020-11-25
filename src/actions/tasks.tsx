import { createAction } from 'retreon';

import * as tasks from '../effects/tasks';
import { TaskView } from '../reducers/tasks';

export const create = createAction('tasks/create', tasks.createTaskMetadata);
export const remove = createAction<string>('tasks/remove');
export const markCompleted = createAction<string>('tasks/mark-completed');
export const markIncomplete = createAction<string>('tasks/mark-incomplete');
export const clearCompleted = createAction('tasks/clear-completed');
export const changeView = createAction<TaskView>('tasks/change-view');
export const toggleCompletion = createAction('tasks/toggle-completion');
