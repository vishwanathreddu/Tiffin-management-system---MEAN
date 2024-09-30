import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';
import { TiffinService } from '../../../services/tiffin-service/tiffin.service';

@Component({
  selector: 'app-mark-tiffin-admin',
  templateUrl: './mark-tiffin-admin.component.html',
  styleUrl: './mark-tiffin-admin.component.css'
})
export class MarkTiffinAdminComponent implements OnInit {

  // tiffins: TiffinOrder[] = [];
  tiffins: any[] = [];
  displayedColumns: string[] = ['username', 'date', 'vegOrNonVeg', 'chapatis', 'sabji', 'floor'];

  //test-1
  filteredTiffins: any[] = [];
  selectedDate: Date = new Date();
  tomorrow: Date = new Date();

  //test-2 & 5
  isLoading: boolean = false;
  noDataFound: boolean = false; // No data found state


  constructor(private tiffinService: TiffinService) {
    // // Set tomorrow's date
    // this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.selectedDate = new Date(this.tomorrow);  // Set initial selectedDate to tomorrow
  }



  //test-2
  // ngOnInit(): void {
  //   // Automatically select tomorrow's date on initialization
  //   this.selectedDate = this.tomorrow;
  //   // Fetch tiffins for tomorrow's date
  //   this.fetchTiffins();
  // }

  // fetchTiffins(): void {
  //   this.isLoading = true; // Show loader
  //   // Adjust date to tomorrow's date
  //   const tomorrowDate = new Date(this.selectedDate);
  //   tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  //   this.tiffinService.getTiffinsForDate(tomorrowDate.toISOString()).subscribe(
  //     data => {
  //       console.log('Tiffin data:', data);  // Log the data structure
  //       this.tiffins = data;
  //       this.filterTiffinsByDate();
  //       this.isLoading = false; // Hide loader after data is fetched
  //     },
  //     error => {
  //       console.error('Error fetching tiffins:', error);
  //       this.isLoading = false; // Hide loader on error
  //     }
  //   );
  // }


  // fetchTiffins(): void {
  //   this.isLoading = true;
  //   const formattedDate = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en');
  //   this.tiffinService.getTiffinsForDate(formattedDate).subscribe(
  //     (data: TiffinOrder[]) => {
  //       console.log('Tiffin data:', data);
  //       this.tiffins = data;
  //       this.filterTiffinsByDate(); // Filter tiffins based on selected date
  //       this.isLoading = false;
  //     },
  //     error => {
  //       console.error('Error fetching tiffins:', error);
  //       this.isLoading = false;
  //     }
  //   );
  // }

  // onDateChange(event: MatDatepickerInputEvent<Date>): void {
  //   this.selectedDate = event.value as Date;
  //   this.filterTiffinsByDate();
  // }

  // filterTiffinsByDate(): void {
  //   const selectedDateString = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en');
  //   this.filteredTiffins = this.tiffins.filter(tiffin => {
  //     const tiffinDateString = formatDate(new Date(tiffin.date), 'yyyy-MM-dd', 'en');
  //     return tiffinDateString === selectedDateString;
  //   });
  // }



  //test-1
  // ngOnInit(): void {
  //   this.tiffinService.getTiffins().subscribe(
  //     data => {
  //       console.log('Tiffin data:', data);  // Log the entire data array
  //       data.forEach((tiffin: TiffinOrder, index: number) => {
  //         console.log(`Tiffin ${index} userId:`, tiffin.userId);
  //       });
  //       this.tiffins = data;
  //     },
  //     error => console.error('Error fetching tiffins:', error)
  //   );
  // }

  // onDateChange(event: MatDatepickerInputEvent<Date>): void {
  //   this.selectedDate = event.value as Date;
  //   this.filterTiffinsByDate();
  // }

  // filterTiffinsByDate(): void {
  //   const selectedDateString = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en');
  //   this.filteredTiffins = this.tiffins.filter(tiffin => {
  //     const tiffinDateString = formatDate(new Date(tiffin.date), 'yyyy-MM-dd', 'en');
  //     return tiffinDateString === selectedDateString;
  //   });
  // }



  // //test-3-best
  // ngOnInit(): void {
  //   this.selectedDate = new Date(this.tomorrow);
  //   this.tiffinService.getTiffins().subscribe(
  //     data => {
  //       this.tiffins = data;
  //       this.filterTiffinsByDate();
  //     },
  //     error => console.error('Error fetching tiffins:', error)
  //   );
  // }

  // onDateChange(event: MatDatepickerInputEvent<Date>): void {
  //   this.selectedDate = event.value as Date;
  //   this.filterTiffinsByDate();
  // }

  // filterTiffinsByDate(): void {
  //   const selectedDateString = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en');
  //   this.filteredTiffins = this.tiffins.filter(tiffin => {
  //     const tiffinDateString = formatDate(new Date(tiffin.date), 'yyyy-MM-dd', 'en');
  //     return tiffinDateString === selectedDateString;
  //   });
  // }


  // test-4-good
  // ngOnInit(): void {
  //   this.tiffinService.getTiffins().subscribe(
  //     data => {
  //       this.tiffins = data;
  //       this.filterTiffinsByDate();  // Filter tiffins by the initial date
  //     },
  //     error => console.error('Error fetching tiffins:', error)
  //   );
  // }

  // onDateChange(event: MatDatepickerInputEvent<Date>): void {
  //   this.selectedDate = event.value as Date;
  //   this.filterTiffinsByDate();
  // }

  // filterTiffinsByDate(): void {
  //   const selectedDateString = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en');
  //   this.filteredTiffins = this.tiffins.filter(tiffin => {
  //     const tiffinDateString = formatDate(new Date(tiffin.date), 'yyyy-MM-dd', 'en');
  //     return tiffinDateString === selectedDateString;
  //   });
  // }


  //test-5-loading
  ngOnInit(): void {
    this.fetchTiffins();
  }

  fetchTiffins(): void {
    this.isLoading = true; // Set loading state to true
    this.tiffinService.getTiffins().subscribe(
      data => {
        this.tiffins = data;
        this.filterTiffinsByDate();
        this.isLoading = false; // Set loading state to false
      },
      error => {
        console.error('Error fetching tiffins:', error);
        this.isLoading = false; // Set loading state to false even if there's an error
      }
    );
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDate = event.value as Date;
    this.filterTiffinsByDate();
  }

  filterTiffinsByDate(): void {
    const selectedDateString = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en');
    this.filteredTiffins = this.tiffins.filter(tiffin => {
      const tiffinDateString = formatDate(new Date(tiffin.date), 'yyyy-MM-dd', 'en');
      return tiffinDateString === selectedDateString;
    });
    this.noDataFound = this.filteredTiffins.length === 0; // Check if no data found
  }

}




// confirmedTiffinData: any;

// receiveConfirmedData(data: any): void {
//   this.confirmedTiffinData = data;
//   console.log('Received Confirmed Tiffin Data:', this.confirmedTiffinData);
//   // Handle displaying or processing the confirmed data as needed
// }
