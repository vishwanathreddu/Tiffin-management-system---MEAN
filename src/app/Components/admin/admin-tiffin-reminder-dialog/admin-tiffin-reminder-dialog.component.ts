// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { AdminTiffinStateService } from '../../../services/admin-tiffin-state-service/admin-tiffin-state.service';

// @Component({
//   selector: 'app-admin-tiffin-reminder-dialog',
//   templateUrl: './admin-tiffin-reminder-dialog.component.html',
//   styleUrls: ['./admin-tiffin-reminder-dialog.component.css']
// })
// export class AdminTiffinReminderDialogComponent {

//   constructor(
//     public dialogRef: MatDialogRef<AdminTiffinReminderDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private adminTiffinStateService: AdminTiffinStateService
//   ) { }

//   onClose(): void {
//     this.dialogRef.close();
//   }

//   // Good
//   // markTiffin(isAvailable: boolean): void {
//   //   // Logic to mark tiffin availability
//   //   console.log('Tiffin availability:', isAvailable);
//   //   this.dialogRef.close();
//   // }

//   markTiffin(option: string): void {
//     // Option is either 'veg', 'non-veg', or 'none'
//     this.adminTiffinStateService.setTiffinAvailability(option);
//     console.log('Tiffin availability:', option);
//     this.dialogRef.close();
//   }
// }


import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminTiffinStateService } from '../../../services/admin-tiffin-state-service/admin-tiffin-state.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-tiffin-reminder-dialog',
  templateUrl: './admin-tiffin-reminder-dialog.component.html',
  styleUrls: ['./admin-tiffin-reminder-dialog.component.css']
})
export class AdminTiffinReminderDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AdminTiffinReminderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminTiffinStateService: AdminTiffinStateService,
    private http: HttpClient
  ) { }

  // markTiffin(option: string): void {
  //   this.http.post('http://localhost:3000/api/tiffin/set-availability', { option })
  //     .subscribe(
  //       (response: any) => {
  //         console.log('Tiffin availability set:', response);
  //         this.adminTiffinStateService.setTiffinAvailability(option);
  //         this.dialogRef.close(option);
  //       },
  //       error => {
  //         console.error('Error setting tiffin availability:', error);
  //         // Handle error (e.g., show an error message)
  //       }
  //     );
  // }

  markTiffin(option: string): void {
    this.http.post('http://localhost:3000/api/tiffin/set-availability', { option })
      .subscribe(
        (response: any) => {
          console.log('Tiffin availability set:', response);
          this.adminTiffinStateService.setTiffinAvailability(option); // Communicate the selected option to other components
          this.dialogRef.close(option);
        },
        error => {
          console.error('Error setting tiffin availability:', error);
        }
      );
  }

}
