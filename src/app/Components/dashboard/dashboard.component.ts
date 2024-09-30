import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService, private router: Router) {
    // this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    // this.authService.getCurrentUser().subscribe((user: any) => {
      //test-1
    this.authService.currentUser.subscribe((user: any) => {
      this.currentUser = user;
    });
    
    // Check if user is authenticated
    this.authService.isLoggedIn.subscribe(authenticated => {
      if (!authenticated) {
        // Redirect to login if not authenticated
        this.router.navigate(['/login']);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // navigateToTiffin(): void {
  //   this.router.navigate(['/mark-tiffin']);
  // }

  //test-1
  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

}
