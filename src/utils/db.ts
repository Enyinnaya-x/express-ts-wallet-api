import { pool } from '../config/database.js';
import { type QueryResult, type QueryResultRow, type PoolClient } from 'pg';

export async function query<T extends QueryResultRow = any>(text: string, params?: any[])
: Promise<QueryResult<T>> {
    const result = await pool.query<T>(text, params);
    return result;
}

export async function withTransaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}