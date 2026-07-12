// utils/db.ts
import { pool } from '../config/database.js';
import {type QueryResult, type QueryResultRow } from 'pg';

export async function query<T extends QueryResultRow = any>(text: string, params?: any[])
: Promise<QueryResult<T>> {
    const result = await pool.query<T>(text, params);
    return result;
}