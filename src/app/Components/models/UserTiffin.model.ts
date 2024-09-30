// UserTiffin Model
export interface UserTiffin {
    username: string;
    totalDays: number;
    totalAmount: number; // Total amount due
    paymentStatus: string; // Paid or Unpaid
  }
  