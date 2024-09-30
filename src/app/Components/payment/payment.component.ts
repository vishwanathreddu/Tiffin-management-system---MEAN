import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  paymentForm!: FormGroup;
  paymentDone = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      date: [new Date()],
      username: [{ value: 'defaultUsername', disabled: true }],
      amount: [''],
      screenshot: [null]
    });
  }

  openQRScanner(): void {
    // Logic for opening QR scanner
  }

  openPaymentStatus(): void {
    // Logic for opening payment status
    this.paymentDone = true;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.paymentForm.patchValue({ screenshot: file });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      const paymentData = new FormData();
      // paymentData.append('date', this.paymentForm.get('date').value);
      // paymentData.append('username', this.paymentForm.get('username').value);
      // paymentData.append('amount', this.paymentForm.get('amount').value);
      // paymentData.append('screenshot', this.paymentForm.get('screenshot').value);

      // Submit paymentData to the backend
    }
  }
}
