import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewslistComponent } from './newslist.component';

const routes: Routes = [
  {
    path : '',
    component : NewslistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewslistRoutingModule { }
