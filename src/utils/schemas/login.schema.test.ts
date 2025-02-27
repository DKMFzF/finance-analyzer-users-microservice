import { loginSchema } from './login.schema';
// @ts-ignore
describe('loginSchema', () => {
  // @ts-ignore
  it('should validate a correct login and password', () => {
    const { error } = loginSchema.validate({ login: 'test', password: 'test' });
    // @ts-ignore
    expect(error).toBeUndefined();
  });

  // @ts-ignore
  it('should return an error if login or password is missing', () => {
    const { error } = loginSchema.validate({});
    // @ts-ignore
    expect(error).toBeDefined();
  });
});
