import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatSelectModule, MatButtonModule, MatIconModule } from '@angular/material';
import { GridModule } from '@progress/kendo-angular-grid';
import { TxclusivelistRoutingModule } from './txclusivelist-routing.module';
import { TxclusivelistComponent } from './txclusivelist.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { TxclusivelistService } from './txclusivelist.service';

@NgModule({
  declarations: [TxclusivelistComponent],
  imports: [
    CommonModule,
    TxclusivelistRoutingModule,

    
    FlexLayoutModule,
    FuseSharedModule,
    GridModule,

    MatSelectModule,
    MatButtonModule,
    MatIconModule

  ],
  providers: [AngularFirestore, TxclusivelistService]
})
export class TxclusivelistModule { }
