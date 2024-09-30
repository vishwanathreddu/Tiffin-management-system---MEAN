import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminTiffinReminderDialogComponent } from '../admin-tiffin-reminder-dialog/admin-tiffin-reminder-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  currentUser: any;
  hasSeenReminderToday: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Check if admin is authenticated
    this.authService.isLoggedIn.subscribe(authenticated => {
      if (!authenticated) {
        this.router.navigate(['/login']);
      }
    });
    this.currentUser = this.authService.currentUserValue;

    // Check if the reminder has been shown today
    const today = new Date().toISOString().split('T')[0]; // Get today's date as a string
    const lastSeenDate = localStorage.getItem('lastSeenReminderDate');

    if (lastSeenDate !== today) {
      this.showTiffinReminder();
      localStorage.setItem('lastSeenReminderDate', today);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string): void {
    this.router.navigate([`/admin/${route}`]);
  }

  showTiffinReminder(): void {
    const dialogRef = this.dialog.open(AdminTiffinReminderDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.hasSeenReminderToday = true;
    });
  }
}
