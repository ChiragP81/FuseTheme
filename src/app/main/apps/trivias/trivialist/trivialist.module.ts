import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrivialistRoutingModule } from './trivialist-routing.module';
import { TrivialistComponent } from './trivialist.component';
import {
    MatSelectModule,
    MatButtonModule,
    MatIconModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TrivialistService } from './trivialist.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { GridModule } from '@progress/kendo-angular-grid';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
    declarations: [TrivialistComponent],
    imports: [
        CommonModule,
        TrivialistRoutingModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule,
        GridModule,
        FuseSharedModule
    ],
    providers: [TrivialistService, AngularFirestore]
})
export class TrivialistModule {}
