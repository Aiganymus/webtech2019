import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../shared/services/task-list.service';
import { TaskList } from '../shared/types/task-list.type';
import { Task } from '../shared/types/task.type';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  taskLists: TaskList[];
  tasks: Task[];

  constructor(private taskListService: TaskListService,
              private taskService: TaskService) { }

  ngOnInit() {
    this.taskListService.getTaskLists().subscribe(
      res => {
        this.taskLists = res;
      }
    );
  }

  showTasks(id: string) {
    this.taskService.getTasks(id).subscribe(
      res => {
        this.tasks = res;
      }
    );
  }

}
