import pool from '../config/db.config';
import logger from '../utils/logger/logger';
import argon2 from 'argon2';

/**
 * регистрация пользователя с хешированием пароля
 */

const SQL_CHECK_USER_EXISTS = 'SELECT id FROM users WHERE login = $1';
const SQL_REGISTER_USER = 'INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *';

export const registerUser = async (login: string, password: string) => {
  logger.info('[LOG]: start service registerUser');

  const userExists = await pool.query(SQL_CHECK_USER_EXISTS, [login]);

  if (userExists.rows.length > 0) {
    logger.error('[ERROR]: user with login %s already exists', login);
    throw new Error('Пользователь с таким логином уже существует');
  }

  const hashedPassword = await argon2.hash(password);

  const result = await pool.query(SQL_REGISTER_USER, [login, hashedPassword]);

  logger.info('[LOG]: end service registerUser');
  return result.rows[0];
};

export default registerUser;
