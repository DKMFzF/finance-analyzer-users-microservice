import pool from '../config/db.config';
import logger from '../utils/logger/logger';

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  );
`;

const initDB = async () => {
  try {
    await pool.query(createTableQuery);
    logger.info('[LOG]: DB users create');
  } catch (error) {
    logger.error('[ERROR]: Err on create DB:', error);
  }
};

export default initDB;
