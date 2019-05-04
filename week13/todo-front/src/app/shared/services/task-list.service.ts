import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { TaskList } from '../types/task-list.type';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  private host = 'http://localhost:8000/api/task_lists';

  constructor(private httpClient: HttpClient) { }

  getTaskList(id: string): Observable<TaskList> {
    return this.httpClient.get<TaskList>(`${this.host}/${id}`);
  }

  getTaskLists(): Observable<TaskList[]> {
    return this.httpClient.get<TaskList[]>(this.host);
  }

  updateTaskList(taskList: TaskList) {
    return this.httpClient.put(`${this.host}/${taskList.id}`, taskList);
  }

  createTaskList(taskList: TaskList) {
    return this.httpClient.post(`${this.host}`, taskList);
  }

  deleteTaskList(id: string) {
    return this.httpClient.delete(`${this.host}/${id}`);
  }
}
