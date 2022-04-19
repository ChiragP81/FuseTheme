import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { LoginComponent } from 'app/main/pages/authentication/login/login.component';
import { LoginService } from './login.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const routes = [
    {
        path: 'auth/login',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [LoginComponent],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
        FuseSharedModule,
        AngularFirestoreModule,
        MatSelectModule
        
    ],
    providers: [LoginService]
})
export class LoginModule {}
