import request from 'supertest';
import app from './app';

describe('GET /', () => {
  it('should return 404 status', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(404);
  });
});
