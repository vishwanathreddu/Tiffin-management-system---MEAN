import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/payment-service/payment.service';
import { Payment } from '../../models/payment.model';

@Component({
  selector: 'app-payment-status-form',
  templateUrl: './payment-status-form.component.html',
  styleUrl: './payment-status-form.component.css'
})
export class PaymentStatusFormComponent implements OnInit{
  payments!: Payment[];

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getPayments().subscribe(
      payments => {
        this.payments = payments;
      },
      error => {
        console.error('Error loading payments:', error);
      }
    );
  }

  updatePaymentStatus(payment: Payment): void {
    this.paymentService.updatePayment(payment).subscribe(
      () => {
        console.log('Payment status updated successfully.');
        // Optionally, you can update the local payments list or notify the user.
      },
      error => {
        console.error('Error updating payment status:', error);
      }
    );
  }
}
