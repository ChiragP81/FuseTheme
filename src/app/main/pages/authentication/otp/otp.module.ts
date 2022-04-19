import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { OTPComponent } from 'app/main/pages/authentication/otp/otp.component';
import { OTPService } from './otp.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const routes = [
    {
        path: 'auth/otp',
        component: OTPComponent
    }
];

@NgModule({
    declarations: [OTPComponent],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
        AngularFirestoreModule
    ],
    providers: [OTPService]
})
export class OTPModule {}
