export interface Payment {
    _id: string; // MongoDB ObjectId
    userId: string; // User ID associated with payment
    amount: number;
    status: 'Pending' | 'Completed';
    paymentDate: Date;
}
