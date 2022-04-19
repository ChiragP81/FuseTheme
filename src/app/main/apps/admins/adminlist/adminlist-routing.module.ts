import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminlistComponent } from './adminlist.component';

const routes: Routes = [
    {
        path: '',
        component: AdminlistComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminlistRoutingModule {}
