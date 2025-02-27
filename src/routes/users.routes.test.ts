import request from 'supertest';
import app from '../app';
import logger from '../utils/logger/logger';

jest.mock('../utils/logger/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe('POST /register', () => {
  it('should register a user and return 200 status', async () => {
    const res = await request(app)
      .post('/register')
      .send({ login: 'test', password: 'test' });
    expect(res.statusCode).toEqual(200);
    expect(logger.info).toHaveBeenCalledWith('[LOG]: start post reqest /register');
  });
});

describe('POST /check-user', () => {
  it('should check a user and return 200 status', async () => {
    const res = await request(app)
      .post('/check-user')
      .send({ login: 'test', password: 'test' });
    expect(res.statusCode).toEqual(200);
    expect(logger.info).toHaveBeenCalledWith('[LOG]: start post reqest /check-user');
  });
});
