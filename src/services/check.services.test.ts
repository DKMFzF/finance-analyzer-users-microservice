import checkUser from '../services/check.services';
import pool from '../config/db.config';

// @ts-ignore
jest.mock('../config/db.config', () => ({
  // @ts-ignore
  query: jest.fn().mockResolvedValue({ rows: [{ id: 1, login: 'test', password: 'test' }] }),
}));

// @ts-ignore
describe('checkUser', () => {
  // @ts-ignore
  it('should return a user if login and password are correct', async () => {
    const user = await checkUser('test', 'test');
    // @ts-ignore
    expect(user).toEqual({ id: 1, login: 'test', password: 'test' });
    // @ts-ignore
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM users WHERE login = $1 AND password = $2', ['test', 'test']);
  });
});
