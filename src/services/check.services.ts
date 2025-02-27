import pool from '../config/db.config';
import logger from '../utils/logger/logger';

const SQL_REQUEST_CHECK_USER = 'SELECT * FROM users WHERE login = $1 AND password = $2';

const checkUser = async (login: string, password: string) => {
  logger.info('[LOG]: start service checkUser');
  const result = await pool.query(SQL_REQUEST_CHECK_USER, [login, password]);
  logger.info('[LOG]: end service checkUser');
  return result.rows[0];
};

export default checkUser;
