import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  // error!: string;
  returnUrl!: string;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    //test-1
    // Get the return URL from the route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  // onSubmit() {
  //   const { email, password } = this.loginForm.value;
  //   this.authService.login(email, password).subscribe(
  //     () => {
  //       // Navigate to dashboard on successful login
  //     },
  //     error => {
  //       this.error = error.error.message; // Display error message from API
  //     }
  //   );
  // }


  //message
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        () => {
          // // this.router.navigate(['/dashboard']);
          //test-1
          // this.router.navigate([this.returnUrl]);

          //test-2
          const currentUser = this.authService.currentUserValue;
          if (currentUser) {
            if (currentUser.role === 'admin') {
              this.router.navigate(['/admin/dashboard']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          }
        },
        error => {
          this.snackBar.open('Login failed. Please check your credentials and try again.', 'Close', {
            duration: 3000
          });
          console.error('Login Error:', error);
        }
      );
    }
  }


  // isSignInMode = false;
  // firstName = '';
  // email = '';
  // password = '';

  // onSubmit() {
  //   if (this.isSignInMode) {
  //     // Handle sign-in logic here
  //     console.log('Signing in:', this.email, this.password);
  //   } else {
  //     // Handle registration logic here
  //     console.log('Registering:', this.firstName, this.email, this.password);
  //   }
  // }

  // toggleSignInMode(event: Event) {
  //   event.preventDefault();  // Prevents the default link behavior
  //   this.isSignInMode = !this.isSignInMode;
  // }
}
