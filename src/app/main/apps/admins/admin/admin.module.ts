import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminService } from './admin.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { FuseSharedModule } from '@fuse/shared.module';
import { UploadDataService } from 'app/common/services/upload.service';
import {
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
} from '@angular/material';
@NgModule({
    declarations: [AdminComponent],
    imports: [
        AdminRoutingModule,
        FuseSharedModule,
        FlexLayoutModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule
    ],
    providers: [
        AdminService,
        UploadDataService,
        AngularFirestore,
        AngularFireStorage
    ]
})
export class AdminModule {}
