import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

import {
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
    declarations: [UserComponent],
    imports: [
        CommonModule,
        UserRoutingModule,

        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        FuseSharedModule,
        FlexLayoutModule,
    ],
    providers: [AngularFirestore, UserService],
})
export class UserModule {}
