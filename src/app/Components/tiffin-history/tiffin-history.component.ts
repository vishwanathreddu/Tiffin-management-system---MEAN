// import { Component, OnInit } from '@angular/core';
// import { TiffinService } from '../../services/tiffin-service/tiffin.service';
// import { TiffinHistory } from '../models/tiffin-history';
// import { AuthService } from '../../services/auth-service/auth.service';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-tiffin-history',
//   templateUrl: './tiffin-history.component.html',
//   styleUrl: './tiffin-history.component.css'
// })
// export class TiffinHistoryComponent implements OnInit {
//   tiffinHistory: any[] = [];
//   totalCount: number = 0;
//   totalAmount: number = 0;
//   displayedColumns: string[] = ['date', 'chapatis', 'vegOrNonVeg', 'sabji', 'floor'];


//   userId: string = '';

//   constructor(private tiffinService: TiffinService,
//     private authService: AuthService,
//     private route: ActivatedRoute
//   ) { }

//   // ngOnInit(): void {
//   //   // const username = 'JohnDoe'; // Replace with actual username or fetch dynamically
//   //   // this.tiffinService.getTiffinHistory(username).subscribe(
//   //   //   (history: TiffinHistory[]) => {
//   //   //     this.tiffinHistory = history;
//   //   //     this.calculateTotals();
//   //   //   },
//   //   //   error => {
//   //   //     console.error('Failed to fetch tiffin history:', error);
//   //   //   }
//   //   // );

//   //   // //test-1
//   //   const currentUser = this.authService.currentUserValue;
//   //   if (currentUser && currentUser._id) {
//   //     this.tiffinService.getTiffinHistory(currentUser._id).subscribe(
//   //       (history: any[]) => {
//   //         this.tiffinHistory = history;
//   //         this.calculateTotals();
//   //       },
//   //       error => {
//   //         console.error('Failed to fetch tiffin history:', error);
//   //       }
//   //     );
//   //   }

//   //   //test-2
//   //   // const currentUser = this.authService.currentUserValue;
//   //   // const username = currentUser ? currentUser.username : ''; // Fetch logged-in user's username dynamically

//   //   // if (username) {
//   //   //   this.tiffinService.getTiffinHistory(username).subscribe(
//   //   //     (history: TiffinHistory[]) => {
//   //   //       this.tiffinHistory = history;
//   //   //       this.calculateTotals();
//   //   //     },
//   //   //     error => {
//   //   //       console.error('Failed to fetch tiffin history:', error);
//   //   //     }
//   //   //   );
//   //   // }
//   // }

//   ngOnInit(): void {
//     this.route.paramMap.subscribe(params => {
//       this.userId = params.get('userId') || '';
//       this.loadTiffinHistory(this.userId);
//     });
//   }

//   loadTiffinHistory(userId: string): void {
//     this.tiffinService.getTiffinHistory(userId).subscribe(
//       (data) => {
//         this.tiffinHistory = data;
//       },
//       (error) => {
//         console.error('Error fetching tiffin history: ', error);
//       }
//     );
//   }


//   calculateTotals(): void {
//     this.totalCount = this.tiffinHistory.length;
//     this.totalAmount = this.totalCount * 60; // Assuming Rs 60 per tiffin
//   }
// }


// // tiffin-history.component.ts

// import { Component, OnInit } from '@angular/core';
// import { TiffinService } from '../../services/tiffin-service/tiffin.service';
// import { AuthService } from '../../services/auth-service/auth.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-tiffin-history',
//   templateUrl: './tiffin-history.component.html',
//   styleUrls: ['./tiffin-history.component.css']
// })
// export class TiffinHistoryComponent implements OnInit {
//   tiffinHistory: any[] = [];
//   displayedColumns: string[] = ['date', 'time', 'vegOrNonVeg', 'chapatis', 'sabji', 'floor'];
//   errorMessage: string = 'No tiffin history found.';

//   constructor(
//     private tiffinHistoryService: TiffinService,
//     private authService: AuthService,
//     private snackBar: MatSnackBar
//   ) { }

//   ngOnInit(): void {
//     console.log('Local Storage Current User:', localStorage.getItem('currentUser')); // Debug line
//     this.loadTiffinHistory();
//   }

//   loadTiffinHistory(): void {
//     // const userId = 'yourUserId';  // Replace with dynamic user ID retrieval logic

//     // const currentUser = this.authService.getCurrentUser();
//     // const userId = currentUser ? currentUser._id : null; // Ensure you're fetching the correct user ID

//     // console.log('Current User ID:', userId); // Debug line

//     // if (!userId) {
//     //   this.errorMessage = 'User ID not found!';
//     //   return;
//     // }


//     //test-1
//     const currentUser = this.authService.getCurrentUser();

//     if (!currentUser || !currentUser._id) {
//       this.errorMessage = 'User ID not found! Please log in again.';
//       this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
//       return;
//     }

//     const userId = currentUser._id;



//     this.tiffinHistoryService.getTiffinHistory(userId).subscribe({
//       next: (data) => {
//         if (data && data.length > 0) {
//           this.tiffinHistory = data;
//         } else {
//           this.errorMessage = 'No tiffin history available';
//           this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
//         }
//       },
//       error: (error) => {
//         console.error('Error fetching tiffin history:', error);
//         this.errorMessage = 'Error fetching tiffin history. Please try again later.';
//       }
//     });
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { TiffinService } from '../../services/tiffin-service/tiffin.service';
// import { AuthService } from '../../services/auth-service/auth.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-tiffin-history',
//   templateUrl: './tiffin-history.component.html',
//   styleUrls: ['./tiffin-history.component.css']
// })
// export class TiffinHistoryComponent implements OnInit {
//   tiffinHistory: any[] = [];
//   displayedColumns: string[] = ['date', 'time', 'vegOrNonVeg', 'chapatis', 'sabji', 'floor'];
//   errorMessage: string = 'No tiffin history found.';

//   constructor(
//     private tiffinHistoryService: TiffinService,
//     private authService: AuthService,
//     private snackBar: MatSnackBar
//   ) { }

//   ngOnInit(): void {
//     this.loadTiffinHistory();
//   }

//   loadTiffinHistory(): void {
//     const currentUser = this.authService.getCurrentUser();

//     if (!currentUser || !currentUser._id) {
//       this.errorMessage = 'User ID not found! Please log in again.';
//       this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
//       return;
//     }

//     const userId = currentUser._id;

//     this.tiffinHistoryService.getTiffinHistory(userId).subscribe({
//       next: (data) => {
//         if (data && data.length > 0) {
//           this.tiffinHistory = data.map(item => ({
//             ...item,
//             formattedTime: this.formatTime(new Date(item.date))
//           }));
//         } else {
//           this.errorMessage = 'No tiffin history available';
//           this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
//         }
//       },
//       error: (error) => {
//         console.error('Error fetching tiffin history:', error);
//         this.errorMessage = 'Error fetching tiffin history. Please try again later.';
//       }
//     });
//   }

//   formatTime(date: Date): string {
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     if (hours === 0 && minutes === 0) {
//       return 'Not specified';
//     }
//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
//   }
// }



import { Component, OnInit } from '@angular/core';
import { TiffinService } from '../../services/tiffin-service/tiffin.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tiffin-history',
  templateUrl: './tiffin-history.component.html',
  styleUrls: ['./tiffin-history.component.css']
})
export class TiffinHistoryComponent implements OnInit {
  tiffinHistory: any[] = [];
  displayedColumns: string[] = ['date', 'time', 'vegOrNonVeg', 'chapatis', 'sabji', 'floor'];
  errorMessage: string = 'No tiffin history found.';

  constructor(
    private tiffinHistoryService: TiffinService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTiffinHistory();
  }

  loadTiffinHistory(): void {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser || !currentUser._id) {
      this.errorMessage = 'User ID not found! Please log in again.';
      this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
      return;
    }

    const userId = currentUser._id;

    this.tiffinHistoryService.getTiffinHistory(userId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.tiffinHistory = data.map(item => ({
            ...item,
            formattedTime: this.formatTime(new Date(item.date))
          }));
        } else {
          this.errorMessage = 'No tiffin history available';
          this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
        }
      },
      error: (error) => {
        console.error('Error fetching tiffin history:', error);
        this.errorMessage = 'Error fetching tiffin history. Please try again later.';
      }
    });
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}


// import { Component, OnInit } from '@angular/core';
// import { TiffinService } from '../../services/tiffin-service/tiffin.service';
// import { AuthService } from '../../services/auth-service/auth.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-tiffin-history',
//   templateUrl: './tiffin-history.component.html',
//   styleUrls: ['./tiffin-history.component.css']
// })
// export class TiffinHistoryComponent implements OnInit {
//   tiffinHistory: any[] = [];
//   displayedColumns: string[] = ['date', 'time', 'vegOrNonVeg', 'chapatis', 'sabji', 'floor'];
//   errorMessage: string = 'No tiffin history found.';

//   constructor(
//     private tiffinHistoryService: TiffinService,
//     private authService: AuthService,
//     private snackBar: MatSnackBar
//   ) { }

//   ngOnInit(): void {
//     this.loadTiffinHistory();
//   }

//   loadTiffinHistory(): void {
//     const currentUser = this.authService.getCurrentUser();

//     if (!currentUser || !currentUser._id) {
//       this.errorMessage = 'User ID not found! Please log in again.';
//       this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
//       return;
//     }

//     const userId = currentUser._id;

//     this.tiffinHistoryService.getTiffinHistory(userId).subscribe({
//       next: (data) => {
//         if (data && data.length > 0) {
//           this.tiffinHistory = data.map(tiffin => ({
//             ...tiffin,
//             date: new Date(tiffin.date)
//           }));
//         } else {
//           this.errorMessage = 'No tiffin history available';
//           this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
//         }
//       },
//       error: (error) => {
//         console.error('Error fetching tiffin history:', error);
//         this.errorMessage = 'Error fetching tiffin history. Please try again later.';
//         this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
//       }
//     });
//   }
// }