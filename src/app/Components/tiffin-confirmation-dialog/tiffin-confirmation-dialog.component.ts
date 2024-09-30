import { Component, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tiffin-confirmation-dialog',
  templateUrl: './tiffin-confirmation-dialog.component.html',
  styleUrl: './tiffin-confirmation-dialog.component.css'
})
export class TiffinConfirmationDialogComponent {

  confirmedData: any; // Variable to hold confirmed data
  onConfirm: EventEmitter<any> = new EventEmitter(); // Event emitter for confirmed data

  constructor(
    public dialogRef: MatDialogRef<TiffinConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.confirmedData = data; // Initialize confirmed data with dialog data
  }

  confirmAndClose(): void {
    this.onConfirm.emit(this.confirmedData); // Emit confirmed data
    this.dialogRef.close(true); // Close dialog
  }

  onCancel(): void {
    this.dialogRef.close(false); // Close dialog without emitting data
  }
}
