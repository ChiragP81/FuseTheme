import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstituteroleRoutingModule } from './instituterole-routing.module';
import { InstituteroleComponent } from "./instituterole.component";
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { InstituteroleService } from './instituterole.service';
import { FormsModule } from '@angular/forms';
import {
    MatIconModule, MatFormFieldModule, MatListModule, MatSelectModule, MatButtonModule
} from '@angular/material';

@NgModule({
    declarations: [InstituteroleComponent],
    imports: [
        CommonModule,
        InstituteroleRoutingModule,
        FlexLayoutModule,
        FormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatListModule,
        MatSelectModule,
        MatButtonModule
    ],
    providers: [AngularFirestore, AngularFireStorage, InstituteroleService]
})
export class InstituteroleModule { }
