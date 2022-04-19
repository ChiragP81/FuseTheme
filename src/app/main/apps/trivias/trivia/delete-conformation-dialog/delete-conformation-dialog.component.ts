import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'delete-confirmation-dialog',
    template: `
        <mat-dialog-content>
            <p>
                {{ data.content }}
            </p>
        </mat-dialog-content>
        <mat-dialog-actions fxlayoutalign="center">
            <button
                type="button"
                mat-raised-button
                class="confirmBtn"
                (click)="onConfirmation()"
                tabindex="1"
            >
                Yes
            </button>
            <button
                type="button"
                mat-raised-button
                mat-dialog-close
                tabindex="-1"
            >
                No
            </button>
        </mat-dialog-actions>
    `,
    styles: [
        '.confirmBtn{ background-color: #3f51b5 !important; color: #fff !important; }',
    ],
})
export class DeleteConfirmationDialog implements OnInit {
    /**
     *Creates an instance of DeleteConfirmationDialog.
     * @param {MatDialogRef<DeleteConfirmationDialog>} dialogRef
     * @param {*} data
     * @memberof DeleteConfirmationDialog
     */
    constructor(
        public dialogRef: MatDialogRef<DeleteConfirmationDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit(): void {}
    /**
     * Method called when click on yes
     */
    onConfirmation(): void {
        this.dialogRef.close(true);
    }
}
