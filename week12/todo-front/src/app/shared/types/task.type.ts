export interface Task {
  id?: string;
  name: string;
  created_at?: string;
  due_on?: string;
  status: string;
  task_list?: string;
}
