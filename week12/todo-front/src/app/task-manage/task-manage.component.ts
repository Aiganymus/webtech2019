import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/types/task.type';
import { TaskService } from '../shared/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { TaskList } from '../shared/types/task-list.type';
import { TaskListService } from '../shared/services/task-list.service';

@Component({
  selector: 'app-task-manage',
  templateUrl: './task-manage.component.html',
  styleUrls: ['./task-manage.component.css']
})
export class TaskManageComponent implements OnInit {
  taskId: string;
  task: Task;
  submitted = false;
  taskForm: FormGroup;
  taskLists: TaskList[] = [];

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router,
              private taskListService: TaskListService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.taskId = param.get('id');
      if (this.taskId) {
        this.taskService.getTask(this.taskId)
            .subscribe(res => {
              this.task = res;
              this.taskForm = new FormGroup({
                name: new FormControl(this.task.name, Validators.required),
                status: new FormControl(this.task.status, Validators.required),
                dueOn: new FormControl(moment(this.task.due_on), Validators.required),
                task_list: new FormControl(this.task.task_list, Validators.required)
              });
            });
      } else {
        this.taskForm = new FormGroup({
          name: new FormControl('', Validators.required),
          status: new FormControl('', Validators.required),
          dueOn: new FormControl(moment(), Validators.required),
          task_list: new FormControl('', Validators.required)
        });
      }
    });
    this.taskListService.getTaskLists()
        .subscribe(
          res => {
            this.taskLists = res;
          }
        );
  }

  submit() {
    this.submitted = true;
    if (this.taskForm.invalid) {
      return;
    }
    const values = this.taskForm.value;
    const toSave = {
      name: values.name,
      status: values.status,
      due_on: values.dueOn.format('YYYY-MM-DD HH:mm:ss'),
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      task_list: this.task ? this.task.task_list : values.task_list
    };
    if (this.taskId) {
      this.taskService.updateTask(this.taskId, toSave)
          .subscribe((res: Task) => {
            this.router.navigateByUrl('/tasks/' + res.id);
          });
    } else {
      this.taskService.createTask(toSave)
          .subscribe((res: Task) => {
            this.router.navigateByUrl('/tasks/' + res.id);
          });
    }
  }

}
