import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TaskComponent } from './task/task.component';
import { TaskListManageComponent } from './task-list-manage/task-list-manage.component';
import { TaskManageComponent } from './task-manage/task-manage.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'tasks'},
  {path: 'tasks', component: MainComponent},
  {path: 'tasks/create', component: TaskManageComponent},
  {path: 'tasks/:id', component: TaskComponent},
  {path: 'tasks/edit/:id', component: TaskManageComponent},
  {path: 'task-list/create', component: TaskListManageComponent},
  {path: 'task-list/edit/:id', component: TaskListManageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
