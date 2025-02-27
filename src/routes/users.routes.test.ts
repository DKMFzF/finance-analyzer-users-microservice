import request from 'supertest';
import app from '../app';
import logger from '../utils/logger/logger';
// @ts-ignore
jest.mock('../utils/logger/logger', () => ({
  // @ts-ignore
  info: jest.fn(),
  // @ts-ignore
  error: jest.fn(),
}));

// @ts-ignore
describe('POST /register', () => {
  // @ts-ignore
  it('should register a user and return 200 status', async () => {
    const res = await request(app)
      .post('/register')
      .send({ login: 'test', password: 'test' });
    // @ts-ignore
    expect(res.statusCode).toEqual(200);
    // @ts-ignore
    expect(logger.info).toHaveBeenCalledWith('[LOG]: start post reqest /register');
  });
});

// @ts-ignore
describe('POST /check-user', () => {
  // @ts-ignore
  it('should check a user and return 200 status', async () => {
    const res = await request(app)
      .post('/check-user')
      .send({ login: 'test', password: 'test' });
    // @ts-ignore
    expect(res.statusCode).toEqual(200);
    // @ts-ignore
    expect(logger.info).toHaveBeenCalledWith('[LOG]: start post reqest /check-user');
  });
});
