import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitutelistComponent } from './institutelist.component';

const routes: Routes = [
  {
    path : '',
    component : InstitutelistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutelistRoutingModule { }
