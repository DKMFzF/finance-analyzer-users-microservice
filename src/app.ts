import express, { Request, Response } from 'express';
// @ts-ignore
import { Pool } from 'pg';
import { Kafka } from 'kafkajs';

const app = express();
app.use(express.json());

// Настройка подключения к PostgreSQL
const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'postgres',
  database: process.env.PGDATABASE || 'auth_db',
  password: process.env.PGPASSWORD || 'root',
  port: Number(process.env.PGPORT) || 5432,
});

// Настройка Kafka
const kafka = new Kafka({
  clientId: 'user-service',
  brokers: [process.env.KAFKA_BROKERS || 'kafka:9092'],
});

const producer = kafka.producer();

// Функция для публикации события
async function publishUserRegisteredEvent(user: { id: number; login: string }) {
  try {
    await producer.connect();
    await producer.send({
      topic: 'user-registered',
      messages: [
        { value: JSON.stringify(user) },
      ],
    });
    console.log('[LOG]: Event UserRegistered published to Kafka');
  } catch (error) {
    console.error('[ERROR]: Failed to publish event to Kafka:', error);
  } finally {
    await producer.disconnect();
  }
}

// Эндпоинт регистрации
app.post('/register', async (req: Request, res: Response) => {
  const { login, password } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *',
      [login, password]
    );
    const user = result.rows[0];

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

export default app;
