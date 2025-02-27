import logger from '../../../src/utils/logger/logger';
import winston from 'winston';
// @ts-ignore
jest.mock('winston', () => ({
  format: {
    // @ts-ignore
    json: jest.fn(),
  },
  transports: {
    // @ts-ignore
    Console: jest.fn(),
    // @ts-ignore
    File: jest.fn(),
  },
  // @ts-ignore
  createLogger: jest.fn().mockReturnValue({
    // @ts-ignore
    info: jest.fn(),
    // @ts-ignore
    error: jest.fn(),
  }),
}));

// @ts-ignore
describe('logger', () => {
  // @ts-ignore
  it('should log info messages', () => {
    logger.info('Test info message');
    // @ts-ignore
    expect(logger.info).toHaveBeenCalledWith('Test info message');
  });

  // @ts-ignore
  it('should log error messages', () => {
    logger.error('Test error message');
    // @ts-ignore
    expect(logger.error).toHaveBeenCalledWith('Test error message');
  });
});
