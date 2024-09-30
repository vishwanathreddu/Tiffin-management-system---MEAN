import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.signupForm.valid) {
      const { fullname, email, password } = this.signupForm.value;
      this.authService.signup(fullname, email, password).subscribe(
        () => {
          this.snackBar.open('Signup successful! Please login.', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Signup error:', error);
          // handle signup error (show message to the user)
          this.snackBar.open('Signup failed. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }
}
