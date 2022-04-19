import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventlistComponent } from './eventlist.component';
import { EventlistService } from './eventlist.service';



const routes: Routes = [
    {
        path: '',
        component: EventlistComponent,
        resolve: {
            data: EventlistService,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EventlistRoutingModule {}
