import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TaskComponent } from './task/task.component';
import { TaskListManageComponent } from './task-list-manage/task-list-manage.component';
import { TaskManageComponent } from './task-manage/task-manage.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: LoginComponent},
  {path: 'tasks', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'tasks/create', component: TaskManageComponent, canActivate: [AuthGuard]},
  {path: 'tasks/:id', component: TaskComponent, canActivate: [AuthGuard]},
  {path: 'tasks/edit/:id', component: TaskManageComponent, canActivate: [AuthGuard]},
  {path: 'task-list/create', component: TaskListManageComponent, canActivate: [AuthGuard]},
  {path: 'task-list/edit/:id', component: TaskListManageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
