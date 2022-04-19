import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DetailPopupComponent } from './detail-popup/detail-popup.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material';

@NgModule({
    declarations: [EventComponent, DetailPopupComponent],
    entryComponents: [DetailPopupComponent],
    imports: [
        CommonModule,
        EventRoutingModule,

        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatTabsModule,
        MatDialogModule,

        FlexLayoutModule,
    ],
})
export class EventModule {}
