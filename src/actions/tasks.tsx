import { createAction } from 'retreon';

export const updateTitle = createAction<string>('tasks/update-title');
export const submit = createAction('tasks/submit');
