import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrivialistComponent } from './trivialist.component';

const routes: Routes = [
  {
    path: '',
    component: TrivialistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrivialistRoutingModule { }
