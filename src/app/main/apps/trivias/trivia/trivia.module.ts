import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TriviaRoutingModule } from './trivia-routing.module';
import { TriviaComponent} from './trivia.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule
} from '@angular/material';
import { FormsModule as FormModule, ReactiveFormsModule } from '@angular/forms';
import { TriviaService } from './trivia.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DeleteConfirmationDialog } from './delete-conformation-dialog/delete-conformation-dialog.component';

@NgModule({
    declarations: [TriviaComponent, DeleteConfirmationDialog],
    entryComponents: [DeleteConfirmationDialog],
    imports: [
        CommonModule,
        TriviaRoutingModule,
        FlexLayoutModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatDialogModule,
        FormModule,
        ReactiveFormsModule
    ],
    providers: [TriviaService, AngularFirestore]
})
export class TriviaModule {}
