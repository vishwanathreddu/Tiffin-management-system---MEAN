// tiffin-order.model.ts
export interface User {
    _id: string;
    email: string;
    fullname: string;
    password: string;
    username: string;
    __v: number;
}

export interface TiffinOrder {
    _id: string;
    chapatis: number;
    date: string;
    floor: string;
    sabji: boolean;
    userId: User;
    vegOrNonVeg: string;
    __v: number;
}

