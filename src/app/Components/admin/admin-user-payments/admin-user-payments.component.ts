// Best
// import { Component, OnInit } from '@angular/core';
// import { PaymentService } from '../../../services/payment-services/payment.service';

// interface Payment {
//   _id: string;
//   userId: {
//     _id: string;
//     fullname: string;
//   };
//   username: string;
//   amount: number;
//   date: string;
//   transactionPhoto: string;
// }

// @Component({
//   selector: 'app-admin-user-payments',
//   templateUrl: './admin-user-payments.component.html',
//   styleUrls: ['./admin-user-payments.component.css']
// })
// export class AdminUserPaymentsComponent implements OnInit {
//   payments: Payment[] = [];
//   errorMessage: string = '';

//   constructor(private paymentService: PaymentService) { }

//   ngOnInit(): void {
//     this.fetchPayments();
//   }

//   fetchPayments(): void {
//     this.paymentService.getUserPayments().subscribe(
//       (data) => {
//         this.payments = data;
//       },
//       (error) => {
//         this.errorMessage = 'Error fetching payment records.';
//         console.error('Error:', error);
//       }
//     );
//   }

//   // New method to generate the image URL
//   getImageUrl(transactionPhoto: string): string {
//     // Check if the transactionPhoto includes "uploads/"
//     if (transactionPhoto.startsWith('uploads/')) {
//       return `http://localhost:3000/${transactionPhoto}`;
//     }
//     // If it’s just a filename, prepend the uploads path
//     return `http://localhost:3000/uploads/${transactionPhoto}`;
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { PaymentService } from '../../../services/payment-services/payment.service';

// interface Payment {
//   _id: string;
//   userId: {
//     _id: string;
//     fullname: string;
//   };
//   username: string;
//   amount: number;
//   date: string;
//   transactionPhoto: string;
// }

// @Component({
//   selector: 'app-admin-user-payments',
//   templateUrl: './admin-user-payments.component.html',
//   styleUrls: ['./admin-user-payments.component.css']
// })
// export class AdminUserPaymentsComponent implements OnInit {
//   payments: Payment[] = [];
//   errorMessage: string = '';

//   selectedMonth: number = new Date().getMonth() + 1; // Current month
//   selectedYear: number = new Date().getFullYear(); // Current year
//   months = [
//     { name: 'January', value: 1 },
//     { name: 'February', value: 2 },
//     { name: 'March', value: 3 },
//     { name: 'April', value: 4 },
//     { name: 'May', value: 5 },
//     { name: 'June', value: 6 },
//     { name: 'July', value: 7 },
//     { name: 'August', value: 8 },
//     { name: 'September', value: 9 },
//     { name: 'October', value: 10 },
//     { name: 'November', value: 11 },
//     { name: 'December', value: 12 }
//   ];
//   years = [2023, 2024, 2025];

//   constructor(private paymentService: PaymentService) { }

//   ngOnInit(): void {
//     this.fetchPaymentsByMonth();
//   }

//   fetchPaymentsByMonth(): void {
//     this.paymentService.getPaymentsByMonth(this.selectedMonth, this.selectedYear).subscribe(
//       (data) => {
//         this.payments = data;
//       },
//       (error) => {
//         this.errorMessage = 'Error fetching payment records.';
//         console.error('Error:', error);
//       }
//     );
//   }

//   getImageUrl(transactionPhoto: string): string {
//     if (transactionPhoto.startsWith('uploads/')) {
//       return `http://localhost:3000/${transactionPhoto}`;
//     }
//     return `http://localhost:3000/uploads/${transactionPhoto}`;
//   }
// }



// Best

// import { Component, OnInit } from '@angular/core';
// import { PaymentService } from '../../../services/payment-services/payment.service';

// interface PaymentDue {
//   userId: string;
//   fullname: string;
//   amount: number;
//   date: string | null;
//   transactionPhoto: string | null;
//   status: string;
// }

// @Component({
//   selector: 'app-admin-user-payments',
//   templateUrl: './admin-user-payments.component.html',
//   styleUrls: ['./admin-user-payments.component.css']
// })
// export class AdminUserPaymentsComponent implements OnInit {
//   paymentDues: PaymentDue[] = [];
//   errorMessage: string = '';

//   selectedMonth: number = new Date().getMonth() + 1; // Current month
//   selectedYear: number = new Date().getFullYear(); // Current year
//   months = [
//     { name: 'January', value: 1 },
//     { name: 'February', value: 2 },
//     { name: 'March', value: 3 },
//     { name: 'April', value: 4 },
//     { name: 'May', value: 5 },
//     { name: 'June', value: 6 },
//     { name: 'July', value: 7 },
//     { name: 'August', value: 8 },
//     { name: 'September', value: 9 },
//     { name: 'October', value: 10 },
//     { name: 'November', value: 11 },
//     { name: 'December', value: 12 }
//   ];
//   // years = [2023, 2024, 2025];
//   displayedColumns: string[] = ['fullname', 'amount', 'date', 'transactionPhoto', 'status'];

//   //test-2
//   years: number[] = [];

//   constructor(private paymentService: PaymentService) { }

//   // ngOnInit(): void {
//   //   this.fetchPaymentDues();
//   // }

//   // fetchPaymentDues(): void {
//   //   this.paymentService.getPaymentDues(this.selectedMonth, this.selectedYear).subscribe(
//   //     (data: { unpaidDues: PaymentDue[]; allDues: PaymentDue[] }) => {
//   //       // Choose whether to show all dues or only unpaid dues
//   //       this.paymentDues = data.allDues;
//   //     },
//   //     (error) => {
//   //       this.errorMessage = 'Error fetching payment dues.';
//   //       console.error('Error:', error);
//   //     }
//   //   );
//   // }

//   //test-2
//   ngOnInit(): void {
//     this.initYears();
//     this.fetchPaymentDues();
//   }

//   // Initialize year options for the dropdown
//   initYears() {
//     const currentYear = new Date().getFullYear();
//     for (let year = currentYear - 10; year <= currentYear; year++) {
//       this.years.push(year);
//     }
//   }

//   fetchPaymentDues(): void {
//     this.paymentService.getPaymentDues(this.selectedMonth, this.selectedYear).subscribe(
//       (data: { unpaidDues: PaymentDue[]; allDues: PaymentDue[] }) => {
//         // Choose whether to show all dues or only unpaid dues
//         this.paymentDues = data.allDues.map(payment => {
//           if (payment.amount === 0) {
//             payment.status = 'No Due';
//             payment.date = null;
//             payment.transactionPhoto = null;
//           } else if (payment.transactionPhoto) {
//             payment.status = 'Paid';
//           } else {
//             payment.status = 'Unpaid';
//             payment.date = null;
//             payment.transactionPhoto = null;
//           }
//           return payment;
//         });
//       },
//       (error) => {
//         this.errorMessage = 'Error fetching payment dues.';
//         console.error('Error:', error);
//       }
//     );
//   }

//   getImageUrl(transactionPhoto: string | null): string {
//     if (!transactionPhoto) return '';
//     return `http://localhost:3000/uploads/${transactionPhoto}`;
//   }
// }


// Components/admin/admin-user-payments.ts
import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/payment-services/payment.service';

interface PaymentDue {
  userId: string;
  fullname: string;
  totalDays: number;
  totalAmount: number;
  amountPaid: number;
  transactionPhoto: string | null;
  status: string;
}

@Component({
  selector: 'app-admin-user-payments',
  templateUrl: './admin-user-payments.component.html',
  styleUrls: ['./admin-user-payments.component.css']
})
export class AdminUserPaymentsComponent implements OnInit {
  paymentDues: PaymentDue[] = [];
  errorMessage: string = '';

  selectedMonth: number = new Date().getMonth() + 1; // Current month
  selectedYear: number = new Date().getFullYear(); // Current year
  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];
  displayedColumns: string[] = ['fullname', 'totalDays', 'totalAmount', 'amountPaid', 'transactionPhoto', 'status'];

  years: number[] = [];

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.initYears();
    this.fetchPaymentDues();
  }

  // Initialize year options for the dropdown
  initYears() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 10; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  fetchPaymentDues(): void {
    this.paymentService.getPaymentDues(this.selectedMonth, this.selectedYear).subscribe(
      (data: { paymentDues: any[] }) => {
        this.paymentDues = data.paymentDues.map(payment => {
          payment.status = payment.amountPaid >= payment.totalAmount ? 'Paid' : 'Unpaid';
          return payment;
        });
      },
      (error) => {
        this.errorMessage = 'Error fetching payment dues.';
        console.error('Error:', error);
      }
    );
  }

  getImageUrl(transactionPhoto: string | null): string {
    if (!transactionPhoto) return '';
    return `http://localhost:3000/uploads/${transactionPhoto}`;
  }
}
