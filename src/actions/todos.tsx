import { createAction } from 'retreon';

export const updateTitle = createAction<string>('todos/update-title');
export const submit = createAction('todos/submit');
