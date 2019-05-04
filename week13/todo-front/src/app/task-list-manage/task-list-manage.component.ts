import { Component, OnInit } from '@angular/core';
import { TaskListService } from '../shared/services/task-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskList } from '../shared/types/task-list.type';

@Component({
  selector: 'app-task-list-manage',
  templateUrl: './task-list-manage.component.html',
  styleUrls: ['./task-list-manage.component.css']
})
export class TaskListManageComponent implements OnInit {
  taskList: TaskList = {
    id: '',
    name: ''
  };
  submitted = false;

  constructor(private taskListService: TaskListService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.taskList.id = param.get('id');
      if (this.taskList.id) {
        this.taskListService.getTaskList(this.taskList.id)
            .subscribe(res => this.taskList = res);
      } else {
        this.taskList.name = '';
      }
    });
  }

  submit() {
    this.submitted = true;
    if (!this.taskList.name) {
      return;
    }
    if (this.taskList.id) {
      this.taskListService.updateTaskList(this.taskList)
          .subscribe(res => {
            console.log(res);
            this.router.navigateByUrl('/tasks');
          });
    } else {
      this.taskListService.createTaskList(this.taskList)
          .subscribe(res => {
            console.log(res);
            this.router.navigateByUrl('/tasks');
          });
    }
  }

}
