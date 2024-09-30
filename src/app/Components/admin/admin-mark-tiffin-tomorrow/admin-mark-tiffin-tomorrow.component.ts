// //Components/admin/admin-mark-tiffin-tomorrow.component.ts
// import { Component, OnInit } from '@angular/core';
// import { TiffinService } from '../../../services/tiffin-service/tiffin.service';

// @Component({
//   selector: 'app-admin-mark-tiffin-tomorrow',
//   templateUrl: './admin-mark-tiffin-tomorrow.component.html',
//   styleUrls: ['./admin-mark-tiffin-tomorrow.component.css']
// })
// export class AdminMarkTiffinTomorrowComponent implements OnInit {
//   tiffins: any[] = [];
//   selectedDate!: Date;
//   errorMessage!: string;
//   displayedColumns: string[] = ['fullname', 'vegOrNonVeg', 'chapatis', 'sabji', 'floor'];

//   constructor(private tiffinService: TiffinService) { }

//   ngOnInit(): void {
//     this.selectedDate = new Date(); // Initialize with current date
//     this.selectedDate.setDate(this.selectedDate.getDate() + 1); // Default to tomorrow
//     this.getTiffinsForDate(this.selectedDate);
//   }

//   //best
//   // ngOnInit(): void {
//   //   this.getTiffinsForTomorrow();
//   //}

//   // getTiffinsForTomorrow(): void {
//   //   this.tiffinService.getTiffinsForTomorrow().subscribe(
//   //     data => {
//   //       this.tiffins = data;
//   //     },
//   //     error => {
//   //       console.error('Error fetching tiffins:', error);
//   //     }
//   //   );
//   // }

//   getTiffinsForDate(date: Date): void {
//     this.tiffinService.getTiffinsForDate(date).subscribe(
//       data => {
//         this.tiffins = data;
//         this.errorMessage = ''; // Clear error message
//       },
//       error => {
//         if (error.status === 404) {
//           this.errorMessage = 'No tiffin orders found for the selected date';
//           this.tiffins = []; // Clear tiffin data
//         } else {
//           this.errorMessage = 'Error fetching tiffins';
//           console.error('Error fetching tiffins:', error);
//         }
//       }
//     );
//   }

//   onDateChange(event: any): void {
//     const newDate = event.value;
//     this.getTiffinsForDate(newDate);
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { TiffinService } from '../../../services/tiffin-service/tiffin.service';

// @Component({
//   selector: 'app-admin-mark-tiffin-tomorrow',
//   templateUrl: './admin-mark-tiffin-tomorrow.component.html',
//   styleUrls: ['./admin-mark-tiffin-tomorrow.component.css']
// })
// export class AdminMarkTiffinTomorrowComponent implements OnInit {
//   tiffins: any[] = [];
//   selectedDate: Date = new Date();
//   errorMessage: string = '';
//   displayedColumns: string[] = ['fullname', 'vegOrNonVeg', 'chapatis', 'sabji', 'floor'];

//   constructor(private tiffinService: TiffinService) { }

//   ngOnInit(): void {
//     this.selectedDate.setDate(this.selectedDate.getDate() + 1); // Default to tomorrow
//     this.getTiffinsForDate(this.selectedDate);
//   }

//   getTiffinsForDate(date: Date): void {
//     this.tiffinService.getTiffinsForDate(date).subscribe(
//       (data: any[]) => {
//         this.tiffins = data;
//         this.errorMessage = '';
//       },
//       (error) => {
//         if (error.status === 404) {
//           this.errorMessage = 'No tiffin orders found for the selected date';
//           this.tiffins = [];
//         } else {
//           this.errorMessage = 'Error fetching tiffins';
//           console.error('Error fetching tiffins:', error);
//         }
//       }
//     );
//   }

//   onDateChange(event: any): void {
//     const newDate = new Date(event.value);
//     this.selectedDate = newDate;
//     this.getTiffinsForDate(newDate);
//   }
// }

// // admin/admin-mark-tiffin-tomorrow.component.ts

// import { Component, OnInit } from '@angular/core';
// import { TiffinService } from '../../../services/tiffin-service/tiffin.service';

// @Component({
//   selector: 'app-admin-mark-tiffin-tomorrow',
//   templateUrl: './admin-mark-tiffin-tomorrow.component.html',
//   styleUrls: ['./admin-mark-tiffin-tomorrow.component.css']
// })
// export class AdminMarkTiffinTomorrowComponent implements OnInit {
//   tiffins: any[] = [];
//   selectedDate: Date = new Date();
//   errorMessage: string = '';
//   displayedColumns: string[] = ['fullname', 'vegOrNonVeg', 'chapatis', 'sabji', 'floor'];

//   constructor(private tiffinService: TiffinService) { }

//   ngOnInit(): void {
//     this.selectedDate.setDate(this.selectedDate.getDate() + 1); // Default to tomorrow
//     this.getTiffinsForDate(this.selectedDate);
//   }

//   getTiffinsForDate(date: Date): void {
//     this.tiffinService.getTiffinsForDate(date).subscribe(
//       (data: any[]) => {
//         this.tiffins = data;
//         this.errorMessage = '';
//       },
//       (error) => {
//         if (error.status === 404) {
//           this.errorMessage = 'No tiffin orders found for the selected date';
//           this.tiffins = [];
//         } else {
//           this.errorMessage = 'Error fetching tiffins';
//           console.error('Error fetching tiffins:', error);
//         }
//       }
//     );
//   }

//   onDateChange(event: any): void {
//     const newDate = new Date(event.value);
//     this.selectedDate = newDate;
//     this.getTiffinsForDate(newDate);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { TiffinService } from '../../../services/tiffin-service/tiffin.service';

@Component({
  selector: 'app-admin-mark-tiffin-tomorrow',
  templateUrl: './admin-mark-tiffin-tomorrow.component.html',
  styleUrls: ['./admin-mark-tiffin-tomorrow.component.css']
})
export class AdminMarkTiffinTomorrowComponent implements OnInit {
  tiffins: any[] = [];
  selectedDate: Date = new Date();
  message: string = '';
  displayedColumns: string[] = ['fullname', 'vegOrNonVeg', 'chapatis', 'sabji', 'floor'];

  constructor(private tiffinService: TiffinService) { }

  ngOnInit(): void {
    this.selectedDate.setDate(this.selectedDate.getDate() + 1); // Default to tomorrow
    this.getTiffinsForDate(this.selectedDate);
  }

  getTiffinsForDate(date: Date): void {
    this.tiffinService.getTiffinsForDate(date).subscribe(
      (data: any[] | null) => {
        if (data === null || data.length === 0) {
          this.message = 'No tiffin orders found for the selected date';
          this.tiffins = [];
        } else {
          this.message = '';
          this.tiffins = data;
        }
      },
      (error) => {
        this.message = 'Error fetching tiffins';
        console.error('Error fetching tiffins:', error);
        this.tiffins = [];
      }
    );
  }

  onDateChange(event: any): void {
    const newDate = new Date(event.value);
    this.selectedDate = newDate;
    this.getTiffinsForDate(newDate);
  }
}