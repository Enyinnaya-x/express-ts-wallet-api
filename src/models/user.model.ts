export interface User{
    id: number;
    full_name: string;
    email: string;
    phone: string;
    password: string;
    acc_number: string;
    withdrawal_pin_hash: string;
    created_at: Date;
    updated_at: Date;
}