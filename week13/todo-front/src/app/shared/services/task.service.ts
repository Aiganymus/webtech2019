import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../types/task.type';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private host = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }

  getTasks(taskListId: string): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.host}/task_lists/${taskListId}/tasks`);
  }

  getTask(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`${this.host}/tasks/${id}`);
  }

  updateTask(id: string, task: Task) {
    return this.httpClient.put(`${this.host}/tasks/${id}`, task);
  }

  createTask(task: Task) {
    return this.httpClient.post(`${this.host}/tasks`, task);
  }

  deleteTask(id: string) {
    return this.httpClient.delete(`${this.host}/tasks/${id}`);
  }

}
