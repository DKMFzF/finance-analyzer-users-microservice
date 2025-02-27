import logger from '../utils/logger/logger';
import producer from '../config/kafka.config';

/**
 * добавление в топик сообщения о регистрации пользователя
 */

export async function publishUserRegisteredEvent(user: { id: number; login: string }) {
  logger.info('[LOG]: Publishing event UserRegistered to Kafka');
  try {
    await producer.connect();
    await producer.send({
      topic: 'user-registered',
      messages: [
        { value: JSON.stringify(user) },
      ],
    });
    logger.info('[LOG]: Event UserRegistered published to Kafka');
  } catch (error) {
    logger.error('[ERROR]: Failed to publish event to Kafka:', error);
  } finally {
    await producer.disconnect();
  }
}
