import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewslistRoutingModule } from './newslist-routing.module';
import { NewslistComponent } from './newslist.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatSelectModule,
    MatButtonModule,
    MatIconModule
} from '@angular/material';

import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { AngularFirestore } from '@angular/fire/firestore';
import { NewslistService } from './newslist.service';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
    declarations: [NewslistComponent],
    imports: [
        CommonModule,
        NewslistRoutingModule,
        FlexLayoutModule,
        GridModule,
        FuseSharedModule,

        DropDownsModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule
    ],
    providers: [AngularFirestore, NewslistService]
})
export class NewslistModule {}
