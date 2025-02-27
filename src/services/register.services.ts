import pool from '../config/db.config';
import logger from '../utils/logger/logger';

const SQL_REQUEST_REGISTER_USER = 'INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *';

export const registerUser = async (login: string, password: string) => {
  logger.info('[LOG]: start service registerUser');
  const result = await pool.query(SQL_REQUEST_REGISTER_USER, [login, password]);
  logger.info('[LOG]: end service registerUser');
  return result.rows[0];
};

export default registerUser;
