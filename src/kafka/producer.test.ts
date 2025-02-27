import { publishUserRegisteredEvent } from '../kafka/producer';
import producer from '../config/kafka.config';

jest.mock('../config/kafka.config', () => ({
  connect: jest.fn(),
  send: jest.fn(),
  disconnect: jest.fn(),
}));

describe('publishUserRegisteredEvent', () => {
  it('should publish a user registered event', async () => {
    const user = { id: 1, login: 'test' };
    await publishUserRegisteredEvent(user);
    expect(producer.connect).toHaveBeenCalled();
    expect(producer.send).toHaveBeenCalledWith({
      topic: 'user-registered',
      messages: [{ value: JSON.stringify(user) }],
    });
    expect(producer.disconnect).toHaveBeenCalled();
  });
});
