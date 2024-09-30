import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TiffinService } from '../../../services/tiffin-service/tiffin.service';
import { UserTiffin } from '../../models/user-tiffin.model';

@Component({
  selector: 'app-admin-monthend-tiffin',
  templateUrl: './admin-monthend-tiffin.component.html',
  styleUrl: './admin-monthend-tiffin.component.css'
})
export class AdminMonthendTiffinComponent {
  displayedColumns: string[] = ['username', 'totalDays', 'totalAmount', 'paymentStatus'];
  dataSource = new MatTableDataSource<UserTiffin>();
  pricePerTiffin = 60;

  //monthend
  monthControl = new FormControl(new Date());

  constructor(private tiffinService: TiffinService) { }

  ngOnInit(): void {
    this.fetchMonthlyTiffinData();
  }

  // fetchMonthlyTiffinData(): void {
  //   const date = this.monthControl.value;
  //   if (date) {
  //     const year = date.getFullYear();
  //     const month = date.getMonth() + 1; // getMonth() is zero-based

  //     this.tiffinService.getMonthlyTiffinReport(year, month).subscribe(data => {
  //       const userTiffinData = this.mapTiffinOrdersToUserTiffins(data);
  //       this.dataSource.data = userTiffinData;
  //     });
  //   }
  // }

  // mapTiffinOrdersToUserTiffins(tiffinOrders: TiffinOrder[]): UserTiffin[] {
  //   const userTiffinMap: { [username: string]: UserTiffin } = {};

  //   tiffinOrders.forEach(order => {
  //     const username = order.userId.username;
  //     if (!userTiffinMap[username]) {
  //       userTiffinMap[username] = {
  //         username,
  //         totalDays: 0,
  //         totalAmount: 0,
  //         paymentStatus: 'Unpaid'
  //       };
  //     }
  //     userTiffinMap[username].totalDays++;
  //     userTiffinMap[username].totalAmount += this.pricePerTiffin;
  //   });

  //   return Object.values(userTiffinMap);
  // }

  // onMonthChange(event: MatDatepickerInputEvent<Date>): void {
  //   this.fetchMonthlyTiffinData();
  // }


  // calculateTotalDays(username: string): number {
  //   return this.dataSource.data.filter(tiffin => tiffin.userId.username === username).length;
  // }

  // calculateTotalAmount(username: string): number {
  //   const totalDays = this.calculateTotalDays(username);
  //   return totalDays * this.pricePerTiffin;
  // }

  calculatePaymentStatus(username: string): string {
    // Implement your logic to determine payment status
    // For example, if the user has paid the full amount, return 'Paid'
    // Otherwise, return 'Unpaid'
    // This is a placeholder implementation:
    const userTiffin = this.dataSource.data.find(user => user.username === username);
    return userTiffin && userTiffin.totalAmount > 0 ? 'Unpaid' : 'Paid';
  }


  // chosenYearHandler(normalizedYear: Date, datepicker: any): void {
  //   const ctrlValue = this.monthControl.value;
  //   if (ctrlValue) {
  //     ctrlValue.setFullYear(normalizedYear.getFullYear());
  //     this.monthControl.setValue(ctrlValue);
  //   }
  //   datepicker.close();
  // }

  // chosenMonthHandler(normalizedMonth: Date, datepicker: any): void {
  //   const ctrlValue = this.monthControl.value;
  //   if (ctrlValue) {
  //     ctrlValue.setMonth(normalizedMonth.getMonth());
  //     this.monthControl.setValue(ctrlValue);
  //     this.fetchMonthlyTiffinData();
  //   }
  //   datepicker.close();
  // }


  // //test-1
  // fetchMonthlyTiffinData(): void {
  //   const date = this.monthControl.value;
  //   if (date) {
  //     const year = date.getFullYear();
  //     const month = date.getMonth() + 1;

  //     this.tiffinService.getMonthlyTiffinReport(year, month).subscribe(data => {
  //       // const userTiffinData = this.mapTiffinOrdersToUserTiffins(data, month, year);
  //       // this.dataSource.data = userTiffinData;

  //       //test-2
  //       this.dataSource.data = data;
  //     });
  //   }
  // }


  //tes-3
  fetchMonthlyTiffinData(): void {
    const date = this.monthControl.value;
    if (date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      this.tiffinService.getMonthlyTiffinReport(year, month).subscribe(data => {
        this.dataSource.data = data;
      });
    }
  }

  onMonthChange(): void {
    this.fetchMonthlyTiffinData();
  }

  // mapTiffinOrdersToUserTiffins(tiffinOrders: TiffinOrder[], month: number, year: number): UserTiffin[] {
  //   const userTiffinMap: { [username: string]: UserTiffin } = {};

  //   tiffinOrders.forEach(order => {
  //     const username = order.userId.username;
  //     if (!userTiffinMap[username]) {
  //       userTiffinMap[username] = {
  //         username,
  //         totalDays: 0,
  //         totalAmount: 0,
  //         paymentStatus: 'Unpaid',
  //         month,
  //         year
  //       };
  //     }
  //     userTiffinMap[username].totalDays++;
  //     userTiffinMap[username].totalAmount += this.pricePerTiffin;
  //   });

  //   return Object.values(userTiffinMap);
  // }

  //test-2
  // onMonthChange(): void {
  //   this.fetchMonthlyTiffinData();
  // }
}

