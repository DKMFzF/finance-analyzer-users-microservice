import pool from '../config/db.config';

export const registerUser = async (login: string, password: string) => {
  const result = await pool.query(
    'INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *',
    [login, password]
  );
  return result.rows[0];
};

export const checkUser = async (login: string, password: string) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE login = $1 AND password = $2',
    [login, password]
  );
  return result.rows[0];
};
