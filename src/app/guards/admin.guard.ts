import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(): boolean {
        if (this.authService.isLoggedInValue() && this.authService.isUserAdmin()) {
            return true;
        }

        // Redirect to the login page if the user is not an admin
        this.router.navigate(['/login']);
        return false;
    }
}
