import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TxclusiveRoutingModule } from './txclusive-routing.module';
import { TxclusiveComponent } from './txclusive.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DetailPopupComponent } from './detail-popup/detail-popup.component';

@NgModule({
  declarations: [TxclusiveComponent, DetailPopupComponent],
  entryComponents: [DetailPopupComponent],
  imports: [
    CommonModule,
    TxclusiveRoutingModule,

    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
    MatDialogModule,

    FlexLayoutModule,
  ]
})
export class TxclusiveModule { }
