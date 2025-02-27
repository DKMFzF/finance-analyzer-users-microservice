import dotenv from "dotenv";
import { z } from "zod";
// @ts-ignore
import { Pool } from 'pg';
import logger from "../utils/logger/logger";

dotenv.config();

/**
 * переменное бд окружение
 */

const configBdSchema = z.object({
  PGUSER: z.string().default("postgres"),
  PGHOST: z.string().default("postgres"),
  PGDATABASE: z.string().default("auth_db"),
  PGPASSWORD: z.string().default("root"),
  PGPORT: z.string().default("5432"),
});

const env = configBdSchema.parse(process.env); // Валидация переменных окружения

if (!env) {
  logger.error("[ERROR]: Invalid environment variables");
  process.exit(1);
}

const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'postgres',
  database: process.env.PGDATABASE || 'auth_db',
  password: process.env.PGPASSWORD || 'root',
  port: Number(process.env.PGPORT) || 5432,
});

if (!pool) {
  logger.error("[ERROR]: Pool invalid environment variables");
  process.exit(1);
}

export default pool;
