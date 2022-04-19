import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserlistRoutingModule } from './userlist-routing.module';
import { UserlistComponent } from './userlist.component';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserlistService } from './userlist.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
    declarations: [UserlistComponent],
    imports: [
        CommonModule,
        UserlistRoutingModule,
        MatIconModule,
        FlexLayoutModule,
        FuseSharedModule,
        GridModule,
        InputsModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
    ],
    providers: [AngularFirestore, UserlistService],
})
export class UserlistModule {}
