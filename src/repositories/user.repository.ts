import { query} from '../utils/db.js';
import type { User } from '../models/user.model.js';

export async function createUser(
    data: Pick<User, 'full_name' | 'email' | 'phone' | 'password' | 'acc_number'>
): Promise<User>{
    const { rows } = await query<User>(
        `INSERT INTO users (full_name, email, phone, password, acc_number, withdrawal_pin_hash)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [data.full_name, data.email, data.phone, data.password,  data.acc_number, null]
    );

    const user = rows[0];

    if(!user){
        throw new Error('Failed to create user');
    }

    return user;
}

export async function findByEmail(email: string){
    const { rows } = await query<User>(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );
    return rows[0];
}

export async function findByAccountNum(accNum: string){
    const { rows } = await query<User>(
        `SELECT * FROM users WHERE acc_number = $1`,
        [accNum]
    );

    return rows[0];
}