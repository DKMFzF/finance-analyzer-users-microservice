import request from 'supertest';
import app from './app';

// @ts-ignore
describe('GET /', () => {
  // @ts-ignore
  it('should return 404 status', async () => {
    const res = await request(app).get('/');
    // @ts-ignore
    expect(res.statusCode).toEqual(404);
  });
});
