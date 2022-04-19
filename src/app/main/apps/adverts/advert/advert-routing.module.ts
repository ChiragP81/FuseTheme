import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvertComponent } from './advert.component';

const routes: Routes = [
  {
    path: '',
    component: AdvertComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertRoutingModule { }
