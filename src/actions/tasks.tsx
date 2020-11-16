import { createAction } from 'retreon';

import * as tasks from '../effects/tasks';

export const updateTitle = createAction<string>('tasks/update-title');
export const create = createAction('tasks/create', tasks.createTaskMetadata);
