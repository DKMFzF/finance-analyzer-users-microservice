import pool from '../config/db.config';
import logger from '../utils/logger/logger';
import argon2 from 'argon2';

/**
 * проверка пользователя
 */

const SQL_REQUEST_CHECK_USER = 'SELECT * FROM users WHERE login = $1';

const checkUser = async (login: string, password: string) => {
  logger.info('[LOG]: start service checkUser');

  const result = await pool.query(SQL_REQUEST_CHECK_USER, [login]);
  
  if (result.rows.length === 0) {
    logger.info('[LOG]: user not found');
    return null;
  }

  const user = result.rows[0];

  // Проверка пароля с хешем
  const isPasswordValid = await argon2.verify(user.password, password);
  
  if (!isPasswordValid) {
    logger.info('[LOG]: invalid password');
    return null;
  }

  logger.info('[LOG]: end service checkUser');
  return user;
};

export default checkUser;
