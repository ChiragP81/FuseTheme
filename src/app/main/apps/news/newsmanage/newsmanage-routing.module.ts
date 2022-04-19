import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsmanageComponent } from './newsmanage.component';

const routes: Routes = [
  {
    path : '',
    component : NewsmanageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsmanageRoutingModule { }


