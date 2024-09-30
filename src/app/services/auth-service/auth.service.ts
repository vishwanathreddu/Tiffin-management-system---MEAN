// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { BehaviorSubject, Observable } from 'rxjs';
// // import { tap } from 'rxjs/operators';
// // import { Router } from '@angular/router';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class AuthService {
// //   private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
// //   private currentUserSubject: BehaviorSubject<any>;
// //   public currentUser: Observable<any>;

// //   constructor(private http: HttpClient, private router: Router) {
// //     this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
// //     this.currentUser = this.currentUserSubject.asObservable();
// //   }

// //   get isLoggedIn() {
// //     return this.loggedIn.asObservable();
// //   }

// //   public get currentUserValue(): any {
// //     return this.currentUserSubject.value;
// //   }

// //   login(email: string, password: string): Observable<any> {
// //     return this.http.post<any>('/api/auth/login', { email, password }).pipe(
// //       tap(response => {
// //         if (response.token) {
// //           localStorage.setItem('token', response.token);
// //           localStorage.setItem('currentUser', JSON.stringify(response.user));
// //           this.currentUserSubject.next(response.user);
// //           this.loggedIn.next(true);
// //         }
// //       })
// //     );
// //   }

// //   signup(fullName: string, email: string, password: string): Observable<any> {
// //     return this.http.post<any>('/api/auth/signup', { fullName, email, password });
// //   }

// //   logout() {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('currentUser');
// //     this.currentUserSubject.next(null);
// //     this.loggedIn.next(false);
// //     this.router.navigate(['/login']);
// //   }

// //   private hasToken(): boolean {
// //     return !!localStorage.getItem('token');
// //   }
// // }



// //test-1
// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { BehaviorSubject, Observable } from 'rxjs';
// // import { tap, catchError } from 'rxjs/operators';
// // import { Router } from '@angular/router';
// // import { MatSnackBar } from '@angular/material/snack-bar';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class AuthService {
// //   private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
// //   private currentUserSubject: BehaviorSubject<any>;
// //   public currentUser: Observable<any>;

// //   constructor(
// //     private http: HttpClient,
// //     private router: Router,
// //     private snackBar: MatSnackBar
// //   ) {
// //     this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
// //     this.currentUser = this.currentUserSubject.asObservable();
// //   }

// //   get isLoggedIn() {
// //     return this.loggedIn.asObservable();
// //   }

// //   public get currentUserValue(): any {
// //     return this.currentUserSubject.value;
// //   }

// //   login(email: string, password: string): Observable<any> {
// //     return this.http.post<any>('/api/auth/login', { email, password }).pipe(
// //       tap(response => {
// //         if (response.token) {
// //           localStorage.setItem('token', response.token);
// //           localStorage.setItem('currentUser', JSON.stringify(response.user));
// //           this.currentUserSubject.next(response.user);
// //           this.loggedIn.next(true);
// //         }
// //       }),
// //       catchError(error => {
// //         this.handleError(error);
// //         throw error;
// //       })
// //     );
// //   }

// //   signup(fullName: string, email: string, password: string): Observable<any> {
// //     return this.http.post<any>('/api/auth/signup', { fullName, email, password }).pipe(
// //       catchError(error => {
// //         this.handleError(error);
// //         throw error;
// //       })
// //     );
// //   }

// //   logout() {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('currentUser');
// //     this.currentUserSubject.next(null);
// //     this.loggedIn.next(false);
// //     this.router.navigate(['/login']);
// //   }

// //   private hasToken(): boolean {
// //     return !!localStorage.getItem('token');
// //   }

// //   private handleError(error: any): void {
// //     console.error('API error:', error);
// //     let errorMessage = 'Unknown error occurred';
// //     if (error.error instanceof ErrorEvent) {
// //       // Client-side error
// //       errorMessage = `Error: ${error.error.message}`;
// //     } else {
// //       // Server-side error
// //       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
// //     }
// //     this.snackBar.open(errorMessage, 'Close', {
// //       duration: 3000,
// //     });
// //   }
// // }



// import { Injectable } from '@angular/core';
// import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { BehaviorSubject, Observable, throwError } from 'rxjs';
// import { tap, catchError } from 'rxjs/operators';
// import { Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3000/api/auth'; // Ensure this matches your backend URL

//   private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
//   private currentUserSubject: BehaviorSubject<any>;
//   public currentUser: Observable<any>;

//   constructor(
//     private http: HttpClient,
//     private router: Router,
//     private snackBar: MatSnackBar
//   ) {
//     let storedUser = localStorage.getItem('currentUser');
//     if (storedUser) {
//       try {
//         storedUser = JSON.parse(storedUser);
//       } catch (e) {
//         console.error('Error parsing stored user:', e);
//         storedUser = null;
//         localStorage.removeItem('currentUser');
//       }
//     } else {
//       storedUser = null;
//     }

//     this.currentUserSubject = new BehaviorSubject<any>(storedUser);
//     this.currentUser = this.currentUserSubject.asObservable();


//     //this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
//     //this.currentUser = this.currentUserSubject.asObservable();

//     // this.currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());

//   }

//   get isLoggedIn() {
//     return this.loggedIn.asObservable();
//   }

//   public isLoggedInValue(): boolean {
//     return this.loggedIn.value;
//   }

//   public get currentUserValue(): any {
//     return this.currentUserSubject.value;
//   }

//   // login(email: string, password: string): Observable<any> {
//   //   return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
//   //     tap(response => {
//   //       if (response.token) {
//   //         localStorage.setItem('token', response.token);
//   //         localStorage.setItem('currentUser', JSON.stringify(response.user));
//   //         this.currentUserSubject.next(response.user);
//   //         this.loggedIn.next(true);
//   //       }
//   //     }),
//   //     catchError(this.handleError)
//   //   );
//   // }



//   //test-1
//   // login(email: string, password: string): Observable<any> {
//   //   return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
//   //     tap(response => {
//   //       console.log('Login response:', response); // Debugging log
//   //       if (response.token) {
//   //         localStorage.setItem('token', response.token);
//   //         if (response.user) {
//   //           localStorage.setItem('currentUser', JSON.stringify(response.user));
//   //           this.currentUserSubject.next(response.user);
//   //         } else {
//   //           console.error('No user data in response');
//   //         }
//   //         this.loggedIn.next(true);
//   //       } else {
//   //         console.error('No token in response');
//   //       }
//   //     }),
//   //     catchError(this.handleError)
//   //   );
//   // }

//   //test-1
//   login(email: string, password: string): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
//       tap(response => {
//         if (response.token) {
//           localStorage.setItem('token', response.token);
//           if (response.user) {
//             localStorage.setItem('currentUser', JSON.stringify(response.user));
//             this.currentUserSubject.next(response.user);
//           } else {
//             console.error('No user data in response');
//           }
//           this.loggedIn.next(true);
//         } else {
//           console.error('No token in response');
//         }
//       }),
//       catchError(this.handleError)
//     );
//   }

//   // fetchUserDetails(): Observable<any> {
//   //   return this.http.get<any>(`${this.apiUrl}/user`).pipe(
//   //     tap(user => {
//   //       if (user) {
//   //         this.currentUserSubject.next(user);
//   //       }
//   //     }),
//   //     catchError(error => {
//   //       console.error('Error fetching user details:', error);
//   //       return throwError('Failed to fetch user details');
//   //     })
//   //   );
//   // }

//   //test-1
//   fetchUserDetails(): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('token')}`
//     });

//     return this.http.get<any>(`${this.apiUrl}/user`, { headers }).pipe(
//       tap(user => {
//         if (user) {
//           this.currentUserSubject.next(user);
//         }
//       }),
//       catchError((error: HttpErrorResponse) => {
//         console.error('Error fetching user details:', error);
//         return throwError('Failed to fetch user details');
//       })
//     );
//   }

//   signup(fullname: string, email: string, password: string): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/register`, { fullname, email, password }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
//     this.loggedIn.next(false);
//     this.router.navigate(['/login']);
//   }

//   // getCurrentUser(): any {
//   //   return JSON.parse(localStorage.getItem('currentUser') || '{}');
//   // }

//   // public getCurrentUser(): any {
//   //   const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
//   //   return currentUser;
//   // }

//   //test-1
//   public getCurrentUser(): any {
//     return this.currentUserSubject.value;
//   }

//   private hasToken(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   private handleError(error: HttpErrorResponse): Observable<never> {
//     console.error('API error:', error);
//     let errorMessage = 'Unknown error occurred';
//     if (error.error instanceof ErrorEvent) {
//       // Client-side error
//       errorMessage = `Error: ${error.error.message}`;
//     } else {
//       // Server-side error
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     this.snackBar.open(errorMessage, 'Close', {
//       duration: 3000,
//     });
//     return throwError(errorMessage);
//   }
// }




// updated-test-1
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Ensure this matches your backend URL
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const storedUser = this.loadStoredUser();
    this.currentUserSubject = new BehaviorSubject<any>(storedUser);
    // this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // To observe the logged-in status
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // To get the current logged-in status
  public isLoggedInValue(): boolean {
    return this.loggedIn.value;
  }

  // To get the current user's value
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // User login function
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        this.handleLoginResponse(response);
      }),
      catchError(this.handleError)
    );
  }

  // Function to fetch user details after login
  // fetchUserDetails(): Observable<any> {
  //   const headers = this.createAuthHeaders();
  //   return this.http.get<any>(`${this.apiUrl}/user`, { headers }).pipe(
  //     tap(user => {
  //       this.currentUserSubject.next(user);
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error fetching user details:', error);
  //       return throwError('Failed to fetch user details');
  //     })
  //   );
  // }

  //test-1
  // fetchUserDetails(): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${localStorage.getItem('token')}`
  //   });

  //   return this.http.get<any>(`${this.apiUrl}/user`, { headers }).pipe(
  //     tap(user => {
  //       if (user) {
  //         this.currentUserSubject.next(user);
  //       }
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error fetching user details:', error);
  //       return throwError('Failed to fetch user details');
  //     })
  //   );
  // }

  //test-2 - best
  // Fetch user details after login
  // fetchUserDetails(): Observable<any> {
  //   const headers = this.createAuthHeaders();
  //   return this.http.get<any>(`${this.apiUrl}/user`, { headers }).pipe(
  //     tap(user => {
  //       if (user) {
  //         this.currentUserSubject.next(user);
  //       }
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error fetching user details:', error);
  //       let errorMessage = 'Unknown error occurred';
  //       if (error.status === 400) {
  //         errorMessage = 'Bad request';
  //       } else if (error.status === 401) {
  //         errorMessage = 'Unauthorized';
  //       } else if (error.status === 403) {
  //         errorMessage = 'Forbidden';
  //       } else if (error.status === 404) {
  //         errorMessage = 'Not found';
  //       }
  //       // Display the error message or handle the error in a way that suits your application
  //       this.snackBar.open(errorMessage, 'Close', {
  //         duration: 3000,
  //       });
  //       return throwError(() => new Error('Failed to fetch user details'));
  //     })
  //   );
  // }


  //test-3
  // Fetch user details after login
  fetchUserDetails(): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/user`, { headers }).pipe(
      tap(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user)); // Update localStorage
          this.currentUserSubject.next(user); // Update the subject with new user data
          console.log('User details fetched and stored:', user);
        } else {
          console.error('No user data received');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching user details:', error);
        let errorMessage = 'Unknown error occurred';
        if (error.status === 400) {
          errorMessage = 'Bad request';
        } else if (error.status === 401) {
          errorMessage = 'Unauthorized';
        } else if (error.status === 403) {
          errorMessage = 'Forbidden';
        } else if (error.status === 404) {
          errorMessage = 'Not found';
        }
        this.snackBar.open(errorMessage, 'Close', {
          duration: 3000,
        });
        return throwError(() => new Error('Failed to fetch user details'));
      })
    );
  }





  // User signup function
  // signup(fullname: string, email: string, password: string): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/register`, { fullname, email, password }).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // test-1
  signup(fullname: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { fullname, email, password }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // User logout function
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  // Get the current user
  public getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  // Retrieve token from local storage
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Retrieve user ID from local storage
  public getUserId(): string | null {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.userId : null; // Ensure correct field name
  }

  // Check if token exists
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Create authentication headers
  private createAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Ensure token is added if required
    });
  }

  // isUserAdmin(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user') || '{}'); //best

  //   //test-1
  //   // const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  //   return user && user.role === 'admin'; // Check if the user role is admin
  // }

  // Check if the user is an admin
  isUserAdmin(): boolean {
    const user = this.currentUserValue;
    return user && user.role === 'admin';
  }

  // Handle login response and save token and user data
  // private handleLoginResponse(response: any): void {
  //   if (response.token) {
  //     localStorage.setItem('token', response.token);
  //     if (response.user) {
  //       localStorage.setItem('currentUser', JSON.stringify(response.user));
  //       this.currentUserSubject.next(response.user);
  //     } else {
  //       console.error('No user data in response');
  //     }
  //     this.loggedIn.next(true);
  //   } else {
  //     console.error('No token in response');
  //   }
  // }

  // // Load user data from local storage
  // loadStoredUser(): any {
  //   const storedUser = localStorage.getItem('currentUser');
  //   if (storedUser) {
  //     try {
  //       return JSON.parse(storedUser);
  //     } catch (e) {
  //       console.error('Error parsing stored user:', e);
  //       localStorage.removeItem('currentUser');
  //     }
  //   }
  //   console.error('No user found in localStorage');
  //   return null;
  // }


  //test-1 - best
  // private handleLoginResponse(response: any): void {
  //   console.log('Login Response:', response);
  //   if (response.token) {
  //     localStorage.setItem('token', response.token);
  //     console.log('Token set in localStorage');
  //     if (response.user) {
  //       localStorage.setItem('currentUser', JSON.stringify(response.user));
  //       this.currentUserSubject.next(response.user);
  //       console.log('User set in localStorage:', response.user);
  //     } else {
  //       console.error('No user data in response');
  //     }
  //     this.loggedIn.next(true);
  //   } else {
  //     console.error('No token in response');
  //   }
  // }

  //test-2 - good
  // private handleLoginResponse(response: any): void {
  //   console.log('Login Response:', response);

  //   if (response.token) {
  //     localStorage.setItem('token', response.token);
  //     console.log('Token set in localStorage');

  //     if (response.user) {
  //       localStorage.setItem('currentUser', JSON.stringify(response.user));
  //       this.currentUserSubject.next(response.user);

  //       console.log('User set in localStorage:', response.user);
  //     } else {
  //       console.error('No user data in response');
  //     }

  //     this.loggedIn.next(true);
  //   } else {
  //     console.error('No token in response');
  //   }
  // }


  //test-3
  // services/auth.service.ts

  private handleLoginResponse(response: any): void {
    console.log('Login Response:', response);

    if (response.token) {
      localStorage.setItem('token', response.token); // Store the token
      console.log('Token set in localStorage');

      const user = {
        token: response.token,
        role: response.role, // Add role to user object
        fullname: response.fullname // Ensure fullname is included
      };

      localStorage.setItem('currentUser', JSON.stringify(user)); // Store user object
      this.currentUserSubject.next(user);

      console.log('User set in localStorage:', user);
      this.loggedIn.next(true);
    } else {
      console.error('No token in response');
    }
  }


  //test-3
  // private handleLoginResponse(response: any): void {
  //   console.log('Login Response:', response);

  //   if (response) {
  //     console.log('Response Structure:', response);

  //     if (response.token) {
  //       localStorage.setItem('token', response.token);
  //       console.log('Token set in localStorage');

  //       if (response.user) {
  //         localStorage.setItem('currentUser', JSON.stringify(response.user));
  //         this.currentUserSubject.next(response.user);

  //         console.log('User set in localStorage:', response.user);
  //       } else {
  //         console.error('No user data in response');
  //       }

  //       this.loggedIn.next(true);
  //     } else {
  //       console.error('No token in response');
  //     }
  //   } else {
  //     console.error('Response is undefined or null');
  //   }
  // }



  loadStoredUser(): any {
    const storedUser = localStorage.getItem('currentUser');
    console.log('Loaded User from localStorage:', storedUser);
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('currentUser');
      }
    }
    console.error('No user found in localStorage');
    return null;
  }


  // Handle errors and show snack bar message
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API error:', error);
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.snackBar.open(errorMessage, 'Close', {
      duration: 3000,
    });
    return throwError(() => new Error(errorMessage));
  }
}


