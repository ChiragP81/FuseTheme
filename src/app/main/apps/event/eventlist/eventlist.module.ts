import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventlistRoutingModule } from './eventlist-routing.module';
import { EventlistComponent } from './eventlist.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatSelectModule, MatButtonModule, MatIconModule } from '@angular/material';
import { GridModule } from '@progress/kendo-angular-grid';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventlistService } from './eventlist.service';


@NgModule({
  declarations: [EventlistComponent],
  imports: [
    CommonModule,
    EventlistRoutingModule,

    FlexLayoutModule,
    FuseSharedModule,
    GridModule,

    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [AngularFirestore, EventlistService]
})
export class EventlistModule { }
