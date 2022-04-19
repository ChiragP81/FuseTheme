import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TxclusivelistComponent } from './txclusivelist.component';
import { TxclusivelistService } from './txclusivelist.service';

const routes: Routes = [
  {
    path: '',
    component: TxclusivelistComponent,
    resolve: {
      data: TxclusivelistService,
  },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TxclusivelistRoutingModule { }
