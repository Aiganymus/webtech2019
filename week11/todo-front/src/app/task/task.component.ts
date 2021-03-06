import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../shared/services/task.service';
import { Task } from '../shared/types/task.type';
import * as moment from 'moment';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  task: Task;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.taskService.getTask(params.get('id')).subscribe(
        res => {
          this.task = res;
          this.task.created_at = moment(this.task.created_at).format('DD-MM-YYYY HH:mm:ss');
          this.task.due_on = moment(this.task.due_on).format('DD-MM-YYYY HH:mm:ss');
        }
      );
    });
  }

}
