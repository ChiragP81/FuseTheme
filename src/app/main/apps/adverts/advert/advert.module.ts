import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertRoutingModule } from './advert-routing.module';
import { AdvertComponent } from './advert.component';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToasterService } from 'app/common/services/toaster.service';
import { FuseSharedModule } from '@fuse/shared.module';
import { AdvertService } from './advert.service';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
    declarations: [AdvertComponent],
    imports: [
        CommonModule,
        AdvertRoutingModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        FuseSharedModule,
        AngularFireStorageModule
    ],
    providers: [ToasterService, AdvertService]
})
export class AdvertModule {}
