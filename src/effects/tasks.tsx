import { v4 as uuid } from 'uuid';

export function createTaskMetadata() {
  return {
    creationDate: new Date().toISOString(),
    id: uuid(),
  };
}
