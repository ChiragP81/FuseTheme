import { Component} from '@angular/core';
import {
    MatDialogRef,
} from '@angular/material';

@Component({
    selector: 'approve-confirmation-dialog',
    template: `
    <mat-dialog-content>
        <p>
            Do you want to approve the request?
        </p>
    </mat-dialog-content>
    <mat-dialog-actions fxlayoutalign="center">
        <button
            mat-raised-button
            class="confirmBtn"
            (click)="onConfirmation()"
            tabindex="1"
        >
            Yes
        </button>
        <button mat-raised-button mat-dialog-close tabindex="-1">No</button>
    </mat-dialog-actions>
`,
styles: [
    '.confirmBtn{ background-color: #3f51b5 !important; color: #fff !important; }',
],
})

export class ConfirmationDialogComponent {
    /**
     * Dialog constructor
     * @param dialogRef
     */
    constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

    /**
     * Method called when click on yes
     */
    onConfirmation(): void {
        this.dialogRef.close(true);
    }
}