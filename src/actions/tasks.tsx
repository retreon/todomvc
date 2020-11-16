import { createAction } from 'retreon';

import * as tasks from '../effects/tasks';

export const updateTitle = createAction<string>('tasks/update-title');
export const create = createAction('tasks/create', tasks.createTaskMetadata);
export const remove = createAction<string>('tasks/remove');
export const markCompleted = createAction<string>('tasks/mark-completed');
export const markIncomplete = createAction<string>('tasks/mark-incomplete');
export const clearCompleted = createAction('tasks/clear-completed');
