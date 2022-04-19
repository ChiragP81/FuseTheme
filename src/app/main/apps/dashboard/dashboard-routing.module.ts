import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';

const routes: Routes = [
    {
        path: '**',
        component: DashboardComponent,
        resolve: {
            data: DashboardService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}
