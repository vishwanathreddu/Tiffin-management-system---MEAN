import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../../Components/models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/api/payments'; // Adjust URL as per your backend API

  constructor(private http: HttpClient) { }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  updatePayment(payment: Payment): Observable<any> {
    const updateUrl = `${this.apiUrl}/${payment._id}`; // Assuming MongoDB _id field
    return this.http.put(updateUrl, payment);
  }
}
