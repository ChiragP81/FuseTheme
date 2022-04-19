import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root',
})
export class ToasterService {
    constructor(public matToaster: MatSnackBar) {}

    success(message): void {
        this.matToaster.open(message, 'success', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000,
        });
    }
    error(message): void {
        this.matToaster.open(message, 'error', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000,
        });
    }
}
