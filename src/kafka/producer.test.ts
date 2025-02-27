import { publishUserRegisteredEvent } from '../kafka/producer';
import producer from '../config/kafka.config';
// @ts-ignore
jest.mock('../config/kafka.config', () => ({
  // @ts-ignore
  connect: jest.fn(),
  // @ts-ignore
  send: jest.fn(),
  // @ts-ignore
  disconnect: jest.fn(),
}));

// @ts-ignore
describe('publishUserRegisteredEvent', () => {
  // @ts-ignore
  it('should publish a user registered event', async () => {
    const user = { id: 1, login: 'test' };
    await publishUserRegisteredEvent(user);
    // @ts-ignore
    expect(producer.connect).toHaveBeenCalled();
    // @ts-ignore
    expect(producer.send).toHaveBeenCalledWith({
      topic: 'user-registered',
      messages: [{ value: JSON.stringify(user) }],
    });
    // @ts-ignore
    expect(producer.disconnect).toHaveBeenCalled();
  });
});
