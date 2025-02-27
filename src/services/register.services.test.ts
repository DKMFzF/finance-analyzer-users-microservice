import { registerUser } from '../services/register.services';
import pool from '../config/db.config';

jest.mock('../config/db.config', () => ({
  query: jest.fn().mockResolvedValue({ rows: [{ id: 1, login: 'test', password: 'test' }] }),
}));

describe('registerUser', () => {
  it('should register a user and return the user object', async () => {
    const user = await registerUser('test', 'test');
    expect(user).toEqual({ id: 1, login: 'test', password: 'test' });
    expect(pool.query).toHaveBeenCalledWith('INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *', ['test', 'test']);
  });
});
