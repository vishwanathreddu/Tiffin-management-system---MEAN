// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatDialog } from '@angular/material/dialog';
// import { TiffinConfirmationDialogComponent } from '../tiffin-confirmation-dialog/tiffin-confirmation-dialog.component';
// import { AuthService } from '../../services/auth-service/auth.service';
// import { TiffinService } from '../../services/tiffin-service/tiffin.service';

// @Component({
//   selector: 'app-mark-tiffin',
//   templateUrl: './mark-tiffin.component.html',
//   styleUrl: './mark-tiffin.component.css'
// })
// export class MarkTiffinComponent implements OnInit {
//   tiffinForm: FormGroup;
//   minDate: Date;

//   constructor(
//     private fb: FormBuilder,
//     private snackBar: MatSnackBar,
//     public dialog: MatDialog,
//     private authService: AuthService, // Inject AuthService
//     private tiffinService: TiffinService // Inject TiffinService
//   ) {

//     this.minDate = new Date();
//     this.minDate.setDate(this.minDate.getDate() + 1); // Tomorrow's date

//     this.tiffinForm = this.fb.group({
//       username: ['', Validators.required],
//       date: [this.minDate, Validators.required],
//       vegOrNonVeg: ['', Validators.required],
//       chapatis: [1, [Validators.required, Validators.min(1)]],
//       sabji: [true],
//       floor: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     // const currentUser = this.authService.getCurrentUser();
//     // if (currentUser && currentUser.username) {
//     //   this.tiffinForm.patchValue({
//     //     username: currentUser.username
//     //   });

//     // }

//     this.authService.fetchUserDetails().subscribe(
//       user => {
//         if (user) {
//           this.tiffinForm.patchValue({
//             username: user.fullname
//           });
//         }
//       },
//       error => {
//         console.error('Failed to fetch user details:', error);
//       }
//     );

//   }

//   onSubmit(): void {
//     if (this.tiffinForm.valid) {
//       const dialogRef = this.dialog.open(TiffinConfirmationDialogComponent, {
//         data: this.tiffinForm.value
//       });

//       // //test-1
//       // dialogRef.componentInstance.onConfirm.subscribe((confirmedData: any) => {
//       //   console.log('Confirmed Tiffin Data:', confirmedData);
//       //   // Optionally, send confirmed data to admin component or service
//       //   // For demonstration, we can show a snackbar message
//       //   this.snackBar.open('Tiffin marked successfully!', 'Close', {
//       //     duration: 3000
//       //   });
//       // });

//       //test-2
//       dialogRef.componentInstance.onConfirm.subscribe((confirmedData: any) => {
//         console.log('Confirmed Tiffin Data:', confirmedData);
//         this.tiffinService.createTiffin(confirmedData).subscribe(
//           response => {
//             this.snackBar.open('Tiffin marked successfully!', 'Close', {
//               duration: 3000
//             });
//             // Optionally, reset the form
//             this.tiffinForm.reset({
//               date: this.minDate,
//               chapatis: 1,
//               sabji: true,
//               username: this.tiffinForm.get('username')?.value
//             });
//           },
//           error => {
//             this.snackBar.open('Failed to mark tiffin.', 'Close', {
//               duration: 3000
//             });
//           }
//         );
//       });

//       // dialogRef.afterClosed().subscribe(result => {
//       //   if (result) {
//       //     this.snackBar.open('Tiffin marked successfully!', 'Close', {
//       //       duration: 3000
//       //     });
//       //     this.tiffinForm.reset({ 
//       //       date: this.minDate,
//       //       chapatis: 1,
//       //       sabji: true,
//       //       username: this.tiffinForm.get('username')?.value
//       //     });
//       //   }
//       // });
//     }
//   }
// }


// good
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatDialog } from '@angular/material/dialog';
// import { TiffinConfirmationDialogComponent } from '../tiffin-confirmation-dialog/tiffin-confirmation-dialog.component';
// import { AuthService } from '../../services/auth-service/auth.service';
// import { TiffinService } from '../../services/tiffin-service/tiffin.service';
// import { AdminTiffinStateService } from '../../services/admin-tiffin-state-service/admin-tiffin-state.service';

// @Component({
//   selector: 'app-mark-tiffin',
//   templateUrl: './mark-tiffin.component.html',
//   styleUrls: ['./mark-tiffin.component.css']
// })
// export class MarkTiffinComponent implements OnInit {
//   tiffinForm: FormGroup;
//   minDate: Date;
//   tiffinAvailability: string = 'none'; // Default state

//   constructor(
//     private fb: FormBuilder,
//     private snackBar: MatSnackBar,
//     public dialog: MatDialog,
//     private authService: AuthService,
//     private tiffinService: TiffinService,
//     private adminTiffinStateService: AdminTiffinStateService // Inject the service
//   ) {
//     this.minDate = new Date();
//     this.minDate.setDate(this.minDate.getDate() + 1); // Tomorrow's date

//     this.tiffinForm = this.fb.group({
//       username: ['', Validators.required],
//       date: [this.minDate, Validators.required],
//       vegOrNonVeg: ['', Validators.required],
//       chapatis: [1, [Validators.required, Validators.min(1)]],
//       sabji: [true],
//       floor: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.authService.fetchUserDetails().subscribe(
//       user => {
//         if (user) {
//           this.tiffinForm.patchValue({
//             username: user.fullname
//           });
//         }
//       },
//       error => {
//         console.error('Failed to fetch user details:', error);
//       }
//     );

//     // Listen for admin's tiffin availability choice
//     this.adminTiffinStateService.tiffinAvailability$.subscribe(availability => {
//       this.tiffinAvailability = availability;
//       this.updateVegNonVegOptions(availability);
//     });
//   }

//   updateVegNonVegOptions(availability: string): void {
//     const vegOrNonVegControl = this.tiffinForm.get('vegOrNonVeg');

//     if (availability === 'veg') {
//       vegOrNonVegControl?.setValue('veg'); // Set default to Veg
//       // vegOrNonVegControl?.disable(); // Disable option change
//       console.log(vegOrNonVegControl);

//     } else if (availability === 'non-veg') {
//       vegOrNonVegControl?.enable(); // Enable option change
//       vegOrNonVegControl?.setValue(''); // Allow user to choose
//     } else if (availability === 'none') {
//       vegOrNonVegControl?.disable(); // Disable the option
//       this.tiffinForm.disable(); // Disable the entire form
//     }
//   }

//   isNonVegDisabled(): boolean {
//     return this.tiffinForm.get('vegOrNonVeg')?.value === 'veg' || this.tiffinAvailability === 'veg';
//   }

//   onSubmit(): void {
//     if (this.tiffinForm.valid) {
//       const dialogRef = this.dialog.open(TiffinConfirmationDialogComponent, {
//         data: this.tiffinForm.value
//       });

//       dialogRef.componentInstance.onConfirm.subscribe((confirmedData: any) => {
//         console.log('Confirmed Tiffin Data:', confirmedData);
//         this.tiffinService.createTiffin(confirmedData).subscribe(
//           response => {
//             this.snackBar.open('Tiffin marked successfully!', 'Close', {
//               duration: 3000
//             });
//             // Optionally, reset the form
//             this.tiffinForm.reset({
//               date: this.minDate,
//               chapatis: 1,
//               sabji: true,
//               username: this.tiffinForm.get('username')?.value
//             });
//           },
//           error => {
//             this.snackBar.open('Failed to mark tiffin.', 'Close', {
//               duration: 3000
//             });
//           }
//         );
//       });
//     }
//   }
// }




// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatDialog } from '@angular/material/dialog';
// import { TiffinConfirmationDialogComponent } from '../tiffin-confirmation-dialog/tiffin-confirmation-dialog.component';
// import { AuthService } from '../../services/auth-service/auth.service';
// import { TiffinService } from '../../services/tiffin-service/tiffin.service';
// import { AdminTiffinStateService } from '../../services/admin-tiffin-state-service/admin-tiffin-state.service';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-mark-tiffin',
//   templateUrl: './mark-tiffin.component.html',
//   styleUrls: ['./mark-tiffin.component.css']
// })
// export class MarkTiffinComponent implements OnInit {
//   tiffinForm: FormGroup;
//   minDate: Date;
//   tiffinAvailability: string = 'none';

//   constructor(
//     private fb: FormBuilder,
//     private snackBar: MatSnackBar,
//     public dialog: MatDialog,
//     private authService: AuthService,
//     private tiffinService: TiffinService,
//     private adminTiffinStateService: AdminTiffinStateService,
//     private http: HttpClient
//   ) {
//     this.minDate = new Date();
//     this.minDate.setDate(this.minDate.getDate() + 1);

//     this.tiffinForm = this.fb.group({
//       username: ['', Validators.required],
//       date: [this.minDate, Validators.required],
//       vegOrNonVeg: ['', Validators.required],
//       chapatis: [1, [Validators.required, Validators.min(1)]],
//       sabji: [true],
//       floor: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.authService.fetchUserDetails().subscribe(
//       user => {
//         if (user) {
//           this.tiffinForm.patchValue({
//             username: user.fullname
//           });
//         }
//       },
//       error => {
//         console.error('Failed to fetch user details:', error);
//       }
//     );

//     this.fetchTiffinAvailability();
//   }

//   fetchTiffinAvailability(): void {
//     this.http.get('http://localhost:3000/api/tiffin/availability/tomorrow')
//       .subscribe(
//         (response: any) => {
//           if (response.vegAvailable) {
//             this.updateTiffinAvailability('veg');
//           } else if (response.nonVegAvailable) {
//             this.updateTiffinAvailability('non-veg');
//           } else {
//             this.updateTiffinAvailability('none');
//           }
//         },
//         error => {
//           console.error('Error fetching tiffin availability:', error);
//           this.updateTiffinAvailability('none');
//         }
//       );
//   }

//   updateTiffinAvailability(availability: string): void {
//     this.tiffinAvailability = availability;
//     this.adminTiffinStateService.setTiffinAvailability(availability);
//     this.updateFormBasedOnAvailability(availability);
//   }

//   updateFormBasedOnAvailability(availability: string): void {
//     const vegOrNonVegControl = this.tiffinForm.get('vegOrNonVeg');

//     if (availability === 'veg') {
//       vegOrNonVegControl?.setValue('veg');
//       vegOrNonVegControl?.disable();
//       this.tiffinForm.enable();
//     } else if (availability === 'non-veg') {
//       vegOrNonVegControl?.enable();
//       vegOrNonVegControl?.setValue('');
//       this.tiffinForm.enable();
//     } else if (availability === 'none') {
//       this.tiffinForm.disable();
//     }
//   }

//   isNonVegDisabled(): boolean {
//     return this.tiffinAvailability === 'veg';
//   }

//   onSubmit(): void {
//     if (this.tiffinForm.valid) {
//       const dialogRef = this.dialog.open(TiffinConfirmationDialogComponent, {
//         data: this.tiffinForm.value
//       });

//       dialogRef.componentInstance.onConfirm.subscribe((confirmedData: any) => {
//         console.log('Confirmed Tiffin Data:', confirmedData);
//         this.tiffinService.createTiffin(confirmedData).subscribe(
//           response => {
//             this.snackBar.open('Tiffin marked successfully!', 'Close', {
//               duration: 3000
//             });
//             this.resetForm();
//           },
//           error => {
//             this.snackBar.open('Failed to mark tiffin.', 'Close', {
//               duration: 3000
//             });
//           }
//         );
//       });
//     }
//   }

//   resetForm(): void {
//     this.tiffinForm.reset({
//       date: this.minDate,
//       chapatis: 1,
//       sabji: true,
//       username: this.tiffinForm.get('username')?.value
//     });
//     this.fetchTiffinAvailability();
//   }
// }


// mark-tiffin.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TiffinConfirmationDialogComponent } from '../tiffin-confirmation-dialog/tiffin-confirmation-dialog.component';
import { AuthService } from '../../services/auth-service/auth.service';
import { TiffinService } from '../../services/tiffin-service/tiffin.service';
import { AdminTiffinStateService } from '../../services/admin-tiffin-state-service/admin-tiffin-state.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mark-tiffin',
  templateUrl: './mark-tiffin.component.html',
  styleUrls: ['./mark-tiffin.component.css']
})
export class MarkTiffinComponent implements OnInit {
  tiffinForm: FormGroup;
  minDate: Date;
  tiffinAvailability: string = 'none';

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private authService: AuthService,
    private tiffinService: TiffinService,
    private adminTiffinStateService: AdminTiffinStateService,
    private http: HttpClient
  ) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);

    this.tiffinForm = this.fb.group({
      username: ['', Validators.required],
      date: [this.minDate, Validators.required],
      vegOrNonVeg: ['', Validators.required],
      chapatis: [1, [Validators.required, Validators.min(1)]],
      sabji: [true],
      floor: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.fetchUserDetails().subscribe(
      user => {
        if (user) {
          this.tiffinForm.patchValue({
            username: user.fullname
          });
        }
      },
      error => {
        console.error('Failed to fetch user details:', error);
      }
    );

    this.fetchTiffinAvailability();
  }

  fetchTiffinAvailability(): void {
    this.http.get('http://localhost:3000/api/tiffin/availability/tomorrow')
      .subscribe(
        (response: any) => {
          if (response.vegAvailable) {
            this.updateTiffinAvailability('veg');
          } else if (response.nonVegAvailable) {
            this.updateTiffinAvailability('non-veg');
          } else {
            this.updateTiffinAvailability('none');
          }
        },
        error => {
          console.error('Error fetching tiffin availability:', error);
          this.updateTiffinAvailability('none');
        }
      );
  }

  updateTiffinAvailability(availability: string): void {
    this.tiffinAvailability = availability;
    this.adminTiffinStateService.setTiffinAvailability(availability);
    this.updateFormBasedOnAvailability(availability);
  }

  updateFormBasedOnAvailability(availability: string): void {
    const vegOrNonVegControl = this.tiffinForm.get('vegOrNonVeg');

    // if (availability === 'veg') {
    //   vegOrNonVegControl?.setValue('veg');
    //   vegOrNonVegControl?.disable();
    //   this.tiffinForm.enable();
    // } else if (availability === 'non-veg') {
    //   vegOrNonVegControl?.enable();
    //   vegOrNonVegControl?.setValue('');
    //   this.tiffinForm.enable();
    // } else if (availability === 'none') {
    //   this.tiffinForm.disable();
    // }

    // // Check admin's selected availability and update the form
    // if (availability === 'veg') {
    //   vegOrNonVegControl?.setValue('veg');
    //   vegOrNonVegControl?.disable(); // Disable the selection since only Veg is available
    //   this.tiffinForm.enable(); // Enable form since tiffin is available
    // } else if (availability === 'non-veg') {
    //   vegOrNonVegControl?.enable(); // Enable both Veg and Non-Veg options
    //   vegOrNonVegControl?.setValue('');
    //   this.tiffinForm.enable(); // Enable form
    // } else if (availability === 'none') {
    //   this.tiffinForm.disable(); // Disable form if no tiffin is available
    // }

    if (availability === 'veg') {
      vegOrNonVegControl?.setValue('veg'); // Pre-select Veg
      vegOrNonVegControl?.disable(); // Disable the select field so that only Veg is available
      this.tiffinForm.enable(); // Enable form as tiffin is available
    } else if (availability === 'non-veg') {
      vegOrNonVegControl?.enable(); // Enable both Veg and Non-Veg options
      vegOrNonVegControl?.setValue(''); // Let the user select between Veg and Non-Veg
      this.tiffinForm.enable(); // Enable form
    } else if (availability === 'none') {
      this.tiffinForm.disable(); // Disable the form if no tiffin is available
    }
  }

  // isVegDisabled(): boolean {
  //   return this.tiffinAvailability === 'none';
  // }

  // isNonVegDisabled(): boolean {
  //   return this.tiffinAvailability === 'none';
  // }

  // // Methods to check the availability of Veg/Non-Veg options
  // isVegDisabled(): boolean {
  //   return this.tiffinAvailability !== 'veg' && this.tiffinAvailability === 'none';
  // }

  // isNonVegDisabled(): boolean {
  //   return this.tiffinAvailability === 'none';
  // }

  isVegDisabled(): boolean {
    return this.tiffinAvailability === 'none'; // Veg is disabled only if no tiffin is available
  }

  isNonVegDisabled(): boolean {
    return this.tiffinAvailability === 'veg' || this.tiffinAvailability === 'none'; // Non-Veg is disabled if only Veg or no tiffin is available
  }

  onSubmit(): void {
    if (this.tiffinForm.valid) {
      const dialogRef = this.dialog.open(TiffinConfirmationDialogComponent, {
        data: this.tiffinForm.value
      });

      dialogRef.componentInstance.onConfirm.subscribe((confirmedData: any) => {
        console.log('Confirmed Tiffin Data:', confirmedData);
        this.tiffinService.createTiffin(confirmedData).subscribe(
          response => {
            this.snackBar.open('Tiffin marked successfully!', 'Close', {
              duration: 3000
            });
            this.resetForm();
          },
          error => {
            this.snackBar.open('Failed to mark tiffin.', 'Close', {
              duration: 3000
            });
          }
        );
      });
    }
  }

  resetForm(): void {
    this.tiffinForm.reset({
      date: this.minDate,
      chapatis: 1,
      sabji: true,
      username: this.tiffinForm.get('username')?.value
    });
    this.fetchTiffinAvailability();
  }
}