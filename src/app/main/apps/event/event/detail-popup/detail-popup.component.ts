import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';


@Component({
  selector: 'app-detail-popup',
  templateUrl: './detail-popup.component.html',
  styles: [],
})
export class DetailPopupComponent implements OnInit {
  detail: any;
  reason: any;
 

  /**

  * Creates an instance of DeleteConfirmationDialog.

  * @param dialogRef Dialog reference component

  * @param data Dialog data

  */

  constructor(
    public dialogRef: MatDialogRef<DetailPopupComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  
  }

  ngOnInit(): void{}
  /**

  * Method called when click on yes

  */

  onConfirmation(reason): void {
    this.dialogRef.close(reason);
  }
}
