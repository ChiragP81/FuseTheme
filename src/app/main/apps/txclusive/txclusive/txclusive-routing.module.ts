import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TxclusiveComponent } from './txclusive.component';

const routes: Routes = [
    {
        path: '',
        component: TxclusiveComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TxclusiveRoutingModule {}
