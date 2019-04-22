import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'tasks'},
  {path: 'tasks', component: MainComponent},
  {path: 'tasks/:id', component: TaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
