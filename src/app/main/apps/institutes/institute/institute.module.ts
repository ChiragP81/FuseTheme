import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstituteRoutingModule } from './institute-routing.module';
import { InstituteComponent } from './institute.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormsModule as FormModule, ReactiveFormsModule } from '@angular/forms';
import { InstituteService } from './institute.service';
import { UploadDataService } from 'app/common/services/upload.service';
import { AngularFireStorage } from '@angular/fire/storage';
import {
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [InstituteComponent],
  imports: [
    CommonModule,
    InstituteRoutingModule,
    FlexLayoutModule,
    FormModule, 
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers : [ AngularFirestore , InstituteService , UploadDataService , AngularFireStorage ]
})
export class InstituteModule { }
