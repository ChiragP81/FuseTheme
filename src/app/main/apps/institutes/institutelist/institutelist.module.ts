import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutelistRoutingModule } from './institutelist-routing.module';
import { InstitutelistComponent } from './institutelist.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { GridModule } from '@progress/kendo-angular-grid';
import { AngularFirestore } from '@angular/fire/firestore';
import { InstitutelistService } from './institutelist.service';
import { 
    MatSelectModule,
    MatButtonModule,
    MatIconModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
  declarations: [InstitutelistComponent],
  imports: [
    CommonModule,
    InstitutelistRoutingModule,
    FlexLayoutModule,
    FuseSharedModule,
    GridModule,

    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [AngularFirestore, InstitutelistService]
})
export class InstitutelistModule { }
