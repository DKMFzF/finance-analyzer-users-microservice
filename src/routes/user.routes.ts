import express, { Request, Response } from 'express';
import pool from '../config/db.config';
import { publishUserRegisteredEvent } from '../kafka/producer';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  const { login, password } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *',
      [login, password]
    );
    const user = result.rows[0];

    await publishUserRegisteredEvent({ id: user.id, login: user.login });

    res.json({
      message: 'Пользователь зарегистрирован',
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Ошибка регистрации',
      error: error.message,
    });
  }
});

router.post('/check-user', async (req: Request, res: Response) => {
  const { login, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE login = $1 AND password = $2',
      [login, password]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Пользователь не найден' });
    }
  } catch (error: any) {
    res.status(500).json({
      message: 'Ошибка сервера',
      error: error.message,
    });
  }
});

export default router;
