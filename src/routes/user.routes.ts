import express, { Request, Response } from 'express';
import { registerUser, checkUser } from '../services/register.services';
import { publishUserRegisteredEvent } from '../kafka/producer';

const router = express.Router();

// Регистрация пользователя
router.post('/register', async (req: Request, res: Response) => {
  const { login, password } = req.body;

  try {
    // Использование сервисного слоя для регистрации пользователя
    const user = await registerUser(login, password);

    // Публикация события в Kafka
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

// Проверка пользователя
router.post('/check-user', async (req: Request, res: Response) => {
  const { login, password } = req.body;

  try {
    // Использование сервисного слоя для проверки пользователя
    const user = await checkUser(login, password);

    if (user) {
      res.json(user);
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
