import { v4 as uuid } from 'uuid';

export function createTaskMetadata(title: string) {
  return {
    title,
    creationDate: new Date().toISOString(),
    id: uuid(),
  };
}
