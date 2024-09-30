// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { PaymentService } from '../../services/payment-services/payment.service';
// import { TiffinService } from '../../services/tiffin-service/tiffin.service';
// import { UserTiffin } from '../models/UserTiffin.model';

// @Component({
//   selector: 'app-payment-page',
//   templateUrl: './payment-page.component.html',
//   styleUrls: ['./payment-page.component.css']
// })
// export class PaymentPageComponent implements OnInit {
//   // paymentForm: FormGroup;
//   // selectedFile: File | null = null;

//   // constructor(
//   //   private fb: FormBuilder,
//   //   private paymentService: PaymentService,
//   //   private router: Router
//   // ) {
//   //   this.paymentForm = this.fb.group({
//   //     username: [{ value: '', disabled: true }, Validators.required],
//   //     amount: ['', [Validators.required, Validators.min(0.01)]],
//   //     transactionPhoto: [null, Validators.required],
//   //   });
//   // }

//   // ngOnInit(): void {
//   //   // Retrieve user information from local storage or a user service
//   //   const userData = JSON.parse(localStorage.getItem('user') || '{}');
//   //   this.paymentForm.patchValue({
//   //     username: userData.username || 'Default Username',
//   //     amount: 1000  // Default amount or any dynamic amount
//   //   });
//   // }

//   // // Handle file input change
//   // onFileChange(event: any): void {
//   //   const file = event.target.files[0];
//   //   if (file) {
//   //     this.selectedFile = file;
//   //   }
//   // }

//   // // Simulated QR Scan Event
//   // handleScanResult(): void {
//   //   // Assume QR scanner returns an amount after a successful scan
//   //   const scannedAmount = 1200; // Mock data from a QR scan
//   //   this.paymentForm.patchValue({ amount: scannedAmount });
//   //   alert('QR Code Scanned! Amount updated.');
//   // }

//   // // Submit payment form
//   // submitPayment(): void {
//   //   if (this.paymentForm.valid && this.selectedFile) {
//   //     const formData = new FormData();
//   //     formData.append('userId', localStorage.getItem('userId')!);  // Adjust based on your user storage
//   //     formData.append('username', this.paymentForm.get('username')?.value);
//   //     formData.append('amount', this.paymentForm.get('amount')?.value);
//   //     formData.append('transactionPhoto', this.selectedFile);

//   //     this.paymentService.submitPayment(formData).subscribe({
//   //       next: (response) => {
//   //         alert('Payment submitted successfully!');
//   //         this.router.navigate(['/dashboard']); // Redirect to dashboard or another page
//   //       },
//   //       error: (error) => {
//   //         console.error('Payment submission error:', error);
//   //         alert('Failed to submit payment. Please try again.');
//   //       }
//   //     });
//   //   } else {
//   //     alert('Please fill all the required fields.');
//   //   }
//   // }



//   paymentForm: FormGroup;
//   userInfo: any; // Will contain user information fetched from backend
//   defaultAmount: number = 0; // Default to 0 initially

//   constructor(
//     private fb: FormBuilder,
//     private paymentService: PaymentService,
//     private tiffinService: TiffinService // Inject TiffinService
//   ) {
//     this.paymentForm = this.fb.group({
//       username: [{ value: '', disabled: true }, Validators.required],
//       // amount: ['', [Validators.required, Validators.min(1)]],
//       amount: [{ value: '', disabled: true }, [Validators.required, Validators.min(1)]],
//       transactionPhoto: ['', Validators.required]
//     });
//   }

//   // ngOnInit(): void {
//   //   // Fetch user info, prefill the form
//   //   this.userInfo = JSON.parse(localStorage.getItem('user') || '{}'); // Assume user info is stored in localStorage

//   //   console.log('User Info:', this.userInfo); // Log user info

//   //   this.paymentForm.patchValue({
//   //     username: this.userInfo.fullname,
//   //     // amount: 0 // Default amount, can be changed
//   //   });
//   //   this.loadDefaultAmount(); // Load the amount due for the user
//   //   console.log(this.loadDefaultAmount);

//   // }

//   // loadDefaultAmount(): void {
//   //   const date = new Date();
//   //   const year = date.getFullYear();
//   //   const month = date.getMonth() + 1;

//   //   // Fetch user's tiffin report for the current month
//   //   this.tiffinService.getMonthlyTiffinReport(year, month).subscribe(
//   //     (data: UserTiffin[]) => {
//   //       const userTiffin = data.find(tiffin => tiffin.username === this.userInfo.fullname);
//   //       if (userTiffin) {
//   //         this.defaultAmount = userTiffin.totalAmount || 0; // Use totalAmount from the report
//   //         this.paymentForm.patchValue({
//   //           amount: this.defaultAmount
//   //         });
//   //       }
//   //     },
//   //     (error) => {
//   //       console.error('Error fetching monthly tiffin data', error);
//   //     }
//   //   );
//   // }


//   //test-1
//   ngOnInit(): void {
//     // Fetch user info, prefill the form
//     this.userInfo = JSON.parse(localStorage.getItem('user') || '{}'); // Assume user info is stored in localStorage
//     console.log('User Info:', this.userInfo); // Log user info

//     this.paymentForm.patchValue({
//       username: this.userInfo.fullname
//     });

//     this.loadDefaultAmount(); // Correct method invocation
//   }

//   loadDefaultAmount(): void {
//     const date = new Date();
//     const year = date.getFullYear();
//     const month = date.getMonth() + 1;

//     // Fetch user's tiffin report for the current month
//     this.tiffinService.getMonthlyTiffinReport(year, month).subscribe(
//       (data: UserTiffin[]) => {
//         console.log('Tiffin Data:', data); // Log fetched data

//         const userTiffin = data.find(tiffin => tiffin.username === this.userInfo.fullname);

//         if (userTiffin) {
//           this.paymentForm.patchValue({
//             amount: userTiffin.totalAmount || 0 // Use totalAmount from the report
//           });
//         } else {
//           console.warn('User tiffin data not found');
//         }
//       },
//       (error) => {
//         console.error('Error fetching monthly tiffin data', error);
//       }
//     );
//   }


  // onFileChange(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.paymentForm.patchValue({
  //       transactionPhoto: file
  //     });
  //   }
  // }

//   submitPayment(): void {
//     if (this.paymentForm.valid) {
//       const formData = new FormData();
//       formData.append('userId', this.userInfo._id);
//       formData.append('username', this.userInfo.fullname);
//       formData.append('amount', this.paymentForm.get('amount')?.value);
//       formData.append('transactionPhoto', this.paymentForm.get('transactionPhoto')?.value);

//       this.paymentService.submitPayment(formData).subscribe(
//         (response) => {
//           console.log('Payment submitted successfully', response);
//         },
//         (error) => {
//           console.error('Payment submission failed', error);
//         }
//       );
//     }
//   }
// }




// payment-page.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TiffinService } from '../../services/tiffin-service/tiffin.service';
import { PaymentService } from '../../services/payment-services/payment.service';
import { AuthService } from '../../services/auth-service/auth.service';
// import { TiffinService } from '../services/tiffin.service';
// import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  paymentForm: FormGroup;
  userInfo: any;
  tiffinData: any[] = [];

  constructor(
    private fb: FormBuilder,
    private tiffinService: TiffinService,
    private paymentService: PaymentService,
    private authService: AuthService
  ) {
    this.paymentForm = this.fb.group({
      username: [''],
      amount: [''],
      transactionPhoto: [null]
    });
  }

  ngOnInit(): void {
    this.loadUserInfo();
    this.loadDefaultAmount();
  }

  loadUserInfo(): void {
    this.userInfo = this.authService.getCurrentUser();
    console.log('User Info:', this.userInfo);

    // Ensure userInfo is not null or undefined
    if (this.userInfo) {
      this.paymentForm.patchValue({
        username: this.userInfo.fullname
      });
    } else {
      console.error('User information is not available');
    }
  }

  loadDefaultAmount(): void {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    this.tiffinService.getMonthlyTiffinReport(year, month).subscribe(
      (data: any[]) => {
        this.tiffinData = data;
        console.log('Tiffin Data:', this.tiffinData);

        // Find the current user's tiffin data
        const userTiffinData = this.tiffinData.find(item => item.userId === this.userInfo._id);

        if (userTiffinData) {
          this.paymentForm.patchValue({
            amount: userTiffinData.totalAmount
          });
        } else {
          console.error('User tiffin data not found');
        }
      },
      error => {
        console.error('Error fetching tiffin data:', error);
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.paymentForm.patchValue({
        transactionPhoto: file
      });
    }
  }

  submitPayment(): void {
    if (this.paymentForm.valid) {
      const formData = new FormData();
      formData.append('userId', this.userInfo._id);
      formData.append('username', this.userInfo.fullname);
      formData.append('amount', this.paymentForm.get('amount')?.value);
      formData.append('transactionPhoto', this.paymentForm.get('transactionPhoto')?.value);

      this.paymentService.submitPayment(formData).subscribe(
        (response) => {
          console.log('Payment submitted successfully', response);
        },
        (error) => {
          console.error('Payment submission failed', error);
        }
      );
    }
  }
}
