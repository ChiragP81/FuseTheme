import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstituteroleComponent } from './instituterole.component';

const routes: Routes = [
  {
    path : '',
    component : InstituteroleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituteroleRoutingModule { }
