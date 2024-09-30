// tiffin-history.model.ts

export interface TiffinHistory {
    _id: string;
    userId: {
        _id: string;
        fullname: string;
        email: string;
        // Add other properties if needed
    };
    username: string;
    date: Date;
    vegOrNonVeg: 'veg' | 'non-veg';
    chapatis: number;
    sabji: boolean;
    floor: string;
    paymentStatus: 'pending' | 'paid';
}
