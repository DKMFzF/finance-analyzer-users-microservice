import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger/logger';

/**
 * функция обработки ошибок
 */

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('[ERROR]:', err);
  res.status(500).json({ message: 'Ошибка сервера', error: err.message });
};
