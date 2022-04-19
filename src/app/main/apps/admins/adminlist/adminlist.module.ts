import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminlistComponent } from './adminlist.component';
import { AdminlistRoutingModule } from './adminlist-routing.module';
import { MatIconModule } from '@angular/material/icon';

import { FlexLayoutModule } from '@angular/flex-layout';
import { GridModule } from '@progress/kendo-angular-grid';
import { AngularFirestore } from '@angular/fire/firestore';
import { AdminlistService } from './adminlist.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
    declarations: [AdminlistComponent],
    imports: [
        CommonModule,
        FuseSharedModule,
        AdminlistRoutingModule,
        FlexLayoutModule,
        GridModule,

        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule

    ],
    providers: [AngularFirestore, AdminlistService]
})
export class AdminlistModule {}
