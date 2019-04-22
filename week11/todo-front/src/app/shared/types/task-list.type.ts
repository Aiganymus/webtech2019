import { Task } from './task.type';

export interface TaskList {
  id: string;
  name: string;
  tasks?: Task[];
}
