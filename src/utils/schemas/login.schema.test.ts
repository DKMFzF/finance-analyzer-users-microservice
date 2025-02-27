import { loginSchema } from './login.schema';

describe('loginSchema', () => {
  it('should validate a correct login and password', () => {
    const { error } = loginSchema.validate({ login: 'test', password: 'test' });
    expect(error).toBeUndefined();
  });

  it('should return an error if login or password is missing', () => {
    const { error } = loginSchema.validate({});
    expect(error).toBeDefined();
  });
});
