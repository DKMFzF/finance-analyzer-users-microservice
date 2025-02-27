import express, { Request, Response } from 'express';
import registerUser from '../services/register.services';
import checkUser from '../services/check.services';
import { publishUserRegisteredEvent } from '../kafka/producer';
import logger from '../utils/logger/logger';

const router = express.Router();

// Регистрация пользователя
router.post('/register', async (req: Request, res: Response) => {

  logger.info("[LOG]: start post reqest /register");

  const { login, password } = req.body;

  try {
    const user = await registerUser(login, password);

    await publishUserRegisteredEvent({ id: user.id, login: user.login });

    logger.info("[LOG]: user registered");

    res.json({
      message: 'Пользователь зарегистрирован',
      user,
    });
  } catch (error: any) {
    logger.error("[ERROR]: user registration error");
    res.status(400).json({ message: 'Ошибка регистрации', error: error.message, });
  }
});

// Проверка пользователя
router.post('/check-user', async (req: Request, res: Response) => {

  logger.info("[LOG]: start post reqest /check-user");

  const { login, password } = req.body;

  try {
    const user = await checkUser(login, password);

    if (user) {
      logger.info("[LOG]: user checked");
      res.json(user);
    } else {
      logger.error("[ERROR]: user not found");
      res.status(404).json({ message: 'Пользователь не найден' });
    }
  } catch (error: any) {
    logger.error("[ERROR]: user check error");
    res.status(500).json({
      message: 'Ошибка сервера',
      error: error.message,
    });
  }
});

export default router;
