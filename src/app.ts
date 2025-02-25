import express, { Request, Response } from 'express';
// @ts-ignore
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT: number = Number(process.env.PORT) || 4000;

// Настройка подключения к PostgreSQL через переменные окружения
const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'postgres', // Используем имя сервиса базы данных
  database: process.env.PGDATABASE || 'auth_db',
  password: process.env.PGPASSWORD || 'root',
  port: Number(process.env.PGPORT) || 5432,
});

// Интерфейсы для типизации данных
interface User {
  id: number;
  login: string;
  password: string;
}

interface RegisterRequest {
  login: string;
  password: string;
}

interface CheckUserRequest {
  login: string;
  password: string;
}

// Создание таблицы users, если она еще не создана
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    login TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`).then(() => {
  console.log('Таблица users готова.');
  // @ts-ignore
}).catch((err) => {
  console.error('Ошибка создания таблицы:', err);
});

// Регистрация пользователя
app.post('/register', async (req: Request<{}, {}, RegisterRequest>, res: Response) => {
  const { login, password } = req.body;
  
  try {
    const result = await pool.query<User>(
      'INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *',
      [login, password]
    );
    res.json({
      message: 'Пользователь зарегистрирован',
      user: result.rows[0]
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Ошибка регистрации',
      error: error.message
    });
  }
});

// Проверка пользователя (используется Auth Service для аутентификации)
app.post('/check-user', async (req: Request<{}, {}, CheckUserRequest>, res: Response) => {
  const { login, password } = req.body;
  
  try {
    const result = await pool.query<User>(
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
      error: error.message
    });
  }
});

app.listen(PORT, () => console.log(`User Service запущен на порту ${PORT}`));
