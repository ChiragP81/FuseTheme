import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsmanageRoutingModule } from './newsmanage-routing.module';
import { NewsmanageComponent } from './newsmanage.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule as FormModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { NewsmanageService } from './newsmanage.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadDataService } from 'app/common/services/upload.service';
import {
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';

@NgModule({
    declarations: [NewsmanageComponent],
    imports: [
        CommonModule,
        NewsmanageRoutingModule,
        FlexLayoutModule,
        FormModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule
    ],
    providers: [
        AngularFirestore,
        NewsmanageService,
        AngularFireStorage,
        UploadDataService
    ]
})
export class NewsmanageModule {}
