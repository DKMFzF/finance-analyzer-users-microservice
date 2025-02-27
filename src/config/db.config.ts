// @ts-ignore
import { Pool } from 'pg';

/**
 * добавление конфига для базы данных
 */

// TRUNCATE TABLE users RESTART IDENTITY;

const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'postgres',
  database: process.env.PGDATABASE || 'auth_db',
  password: process.env.PGPASSWORD || 'root',
  port: Number(process.env.PGPORT) || 5432,
});

export default pool;
