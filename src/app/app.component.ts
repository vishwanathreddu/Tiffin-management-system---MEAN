import { Component } from '@angular/core';
import { AuthService } from './services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'new-tiffin-management-app';

  constructor(private authService: AuthService) { }

  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('token');
  // }

  //test-1
  isLoggedIn(): boolean {
    return this.authService.isLoggedInValue();
  }

  // Determine if the logged-in user is an admin
  isAdmin(): boolean {
    const currentUser = this.authService.currentUserValue;
    return currentUser && currentUser.role === 'admin';
  }

  logout(): void {
    this.authService.logout();
  }

}
