import { registerUser } from '../services/register.services';
import pool from '../config/db.config';

// @ts-ignore
jest.mock('../config/db.config', () => ({
  // @ts-ignore
  query: jest.fn().mockResolvedValue({ rows: [{ id: 1, login: 'test', password: 'test' }] }),
}));

// @ts-ignore
describe('registerUser', () => {
  // @ts-ignore
  it('should register a user and return the user object', async () => {
    const user = await registerUser('test', 'test');
    // @ts-ignore
    expect(user).toEqual({ id: 1, login: 'test', password: 'test' });
    // @ts-ignore
    expect(pool.query).toHaveBeenCalledWith('INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *', ['test', 'test']);
  });
});
