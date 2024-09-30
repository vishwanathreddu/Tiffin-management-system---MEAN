import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { TiffinOrder } from '../../Components/models/tiffin-order.model';
import { UserTiffin } from '../../Components/models/user-tiffin.model';
import { TiffinHistory } from '../../Components/models/tiffin-history';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TiffinService {
  private apiUrl = 'http://localhost:3000/api/tiffin';

  constructor(private http: HttpClient) { }

  createTiffin(tiffinData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post(`${this.apiUrl}/mark/tomorrow`, tiffinData, { headers });
  }

  // Method to check if user has marked tiffin for previous dates
  checkPreviousTiffinMarking(username: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<boolean>(`${this.apiUrl}/check-previous/${username}`, { headers });
  }

  // Method to fetch tiffins for a specific date
  // getTiffinsForDate(date: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}?date=${date}`);
  // }

  // getTiffins(): Observable<any> {
  //   return this.http.get(this.apiUrl);
  // }

  // //test-1
  // getTiffins(): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  //   return this.http.get(this.apiUrl, { headers });
  // }


  getTiffins(): Observable<TiffinOrder[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    // return this.http.get<TiffinOrder[]>(this.apiUrl, { headers });

    //test-1
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching tiffins:', error);
        throw error;
      })
    );
  }


  // getTiffinsForTomorrow(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/tiffins/tomorrow`);
  // }

  //test-1
  // Function to get the authorization token
  private getAuthToken(): string {
    return localStorage.getItem('token') || ''; // Assuming token is stored in local storage
  }

  // Method to get tiffins for tomorrow
  getTiffinsForTomorrow(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(`${this.apiUrl}/tiffins/tomorrow`, { headers });
  }

  // good
  // getTiffinsForDate(date: Date): Observable<any> {
  //   const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   // Format the date to YYYY-MM-DD
  //   const formattedDate = date.toISOString().split('T')[0];

  //   return this.http.get(`${this.apiUrl}/tiffins?date=${formattedDate}`, { headers });
  // }

  // getTiffinsForDate(date: Date): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   // Format the date to YYYY-MM-DD
  //   const formattedDate = date.toISOString().split('T')[0];

  //   return this.http.get(`${this.apiUrl}/tiffins?date=${formattedDate}`, { headers }).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error fetching tiffins for date:', error);
  //       return throwError(() => new Error('Failed to fetch tiffins for the selected date'));
  //     })
  //   );
  // }

  getTiffinsForDate(date: Date): Observable<any[] | null> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const formattedDate = date.toISOString().split('T')[0];

    return this.http.get<any[]>(`${this.apiUrl}/tiffins?date=${formattedDate}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          // Return null if no tiffins found
          return of(null);
        }
        console.error('Error fetching tiffins for date:', error);
        return throwError(() => new Error('Failed to fetch tiffins for the selected date'));
      })
    );
  }


  // getMonthlyTiffinReport(year: number, month: number): Observable<TiffinOrder[]> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  //   return this.http.get<TiffinOrder[]>(`${this.apiUrl}/monthly-report/${year}/${month}`, { headers });
  // }

  // //test-1
  // getMonthlyTiffinReport(year: number, month: number): Observable<TiffinOrder[]> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  //   return this.http.get<TiffinOrder[]>(`${this.apiUrl}/monthly-report?year=${year}&month=${month}`, { headers });
  // }

  // //test-2
  // getMonthlyTiffinReport(year: number, month: number): Observable<UserTiffin[]> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  //   return this.http.get<UserTiffin[]>(`${this.apiUrl}/monthly-report?year=${year}&month=${month}`, { headers });
  // }


  //tes-3
  getMonthlyTiffinReport(year: number, month: number): Observable<UserTiffin[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<UserTiffin[]>(`${this.apiUrl}/monthly-report?year=${year}&month=${month}`, { headers });
  }

  markTiffin(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/mark/tomorrow`, data);
  }

  //test-1
  // //to fetch the tiffin history
  // getTiffinHistory(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/history`);
  // }

  //test-2
  // getTiffinHistory(username: string): Observable<TiffinHistory[]> {
  //   return this.http.get<TiffinHistory[]>(`${this.apiUrl}/tiffin/history/${username}`);
  // }

  //test-3
  // getTiffinHistory(userId: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/history/${userId}`);
  // }


  //test-4
  // getTiffinHistory(username: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/history/${username}`).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  //test-5
  // getTiffinHistory(userId: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}?userId=${userId}`);
  // }

  //test-6
  getTiffinHistory(userId: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure token is correct
    });

    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching tiffin history:', error);
        return throwError(() => new Error('Failed to fetch tiffin history'));
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API error:', error);
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
