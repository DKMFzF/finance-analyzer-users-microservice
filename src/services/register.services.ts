import pool from '../config/db.config';
import logger from '../utils/logger/logger';

/**
 * регистрация пользователя
 */

const SQL_CHECK_USER_EXISTS = 'SELECT id FROM users WHERE login = $1';
const SQL_REGISTER_USER = 'INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *';

export const registerUser = async (login: string, password: string) => {
  logger.info('[LOG]: start service registerUser');

  // Проверяем, есть ли пользователь с таким login
  const userExists = await pool.query(SQL_CHECK_USER_EXISTS, [login]);

  if (userExists.rows.length > 0) {
    throw new Error('Пользователь с таким логином уже существует');
  }

  // Если пользователя нет — регистрируем
  const result = await pool.query(SQL_REGISTER_USER, [login, password]);

  logger.info('[LOG]: end service registerUser');
  return result.rows[0];
};

export default registerUser;

