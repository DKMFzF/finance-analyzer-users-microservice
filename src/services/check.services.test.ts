import checkUser from '../services/check.services';
import pool from '../config/db.config';

jest.mock('../config/db.config', () => ({
  query: jest.fn().mockResolvedValue({ rows: [{ id: 1, login: 'test', password: 'test' }] }),
}));

describe('checkUser', () => {
  it('should return a user if login and password are correct', async () => {
    const user = await checkUser('test', 'test');
    expect(user).toEqual({ id: 1, login: 'test', password: 'test' });
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM users WHERE login = $1 AND password = $2', ['test', 'test']);
  });
});
