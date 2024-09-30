import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Payment {
  _id: string;
  userId: {
    _id: string;
    fullname: string;
  };
  username: string;
  amount: number;
  date: string;
  transactionPhoto: string;
}

interface PaymentDue {
  userId: string;
  fullname: string;
  amount: number;
  date: string | null;
  transactionPhoto: string | null;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/api/payment';

  constructor(private http: HttpClient) { }

  // getUserPayments(): Observable<Payment[]> {
  //   return this.http.get<Payment[]>(`${this.apiUrl}/user-payments`);
  // }

  // Best
  getUserPayments(): Observable<Payment[]> {
    const token = localStorage.getItem('token'); // or wherever you store your token

    // Set up headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` // Ensure Bearer is included
    });

    return this.http.get<Payment[]>(`${this.apiUrl}/user-payments`, { headers });
  }


  // getUserPayments(year?: number, month?: number): Observable<Payment[]> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`
  //   });

  //   let params = new HttpParams();
  //   if (year && month) {
  //     params = params.set('year', year.toString()).set('month', month.toString());
  //   }

  //   return this.http.get<Payment[]>(`${this.apiUrl}/user-payments`, { headers, params });
  // }


  // Fetch payments for a specific month and year
  getPaymentsByMonth(month: number, year: number): Observable<Payment[]> {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

    // Set up headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` // Ensure Bearer is included
    });

    return this.http.get<Payment[]>(`${this.apiUrl}/user-payments/${month}/${year}`, { headers });
  }

  submitPayment(paymentData: FormData): Observable<any> {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/submit`, paymentData, { headers });
  }

  // Best
  // getPaymentDues(month: number, year: number): Observable<{ unpaidDues: PaymentDue[]; allDues: PaymentDue[] }> {
  //   const token = localStorage.getItem('token');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`
  //   });

  //   return this.http.get<{ unpaidDues: PaymentDue[]; allDues: PaymentDue[] }>(`${this.apiUrl}/dues/${month}/${year}`, { headers });
  // }


  getPaymentDues(month: number, year: number): Observable<{ paymentDues: PaymentDue[] }> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get<{ paymentDues: PaymentDue[] }>(`${this.apiUrl}/dues/${month}/${year}`, { headers });
  }

}
