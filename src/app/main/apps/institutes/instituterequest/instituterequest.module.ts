import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstituterequestRoutingModule } from './instituterequest-routing.module';
import {  InstituterequestComponent } from './instituterequest.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridModule } from '@progress/kendo-angular-grid';
import { InstituterequestService } from './instituterequest.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatIconModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { ConfirmationDialogComponent } from './approve-confirmation-dialog/approve-conformation-dialog.component';

@NgModule({
  declarations: [ InstituterequestComponent , ConfirmationDialogComponent ],
  entryComponents: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    InstituterequestRoutingModule,
    FlexLayoutModule,
    GridModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [ InstituterequestService , AngularFirestore ]
})
export class InstituterequestModule { }
