import { Kafka, Producer } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'user-service',
  brokers: [process.env.KAFKA_BROKERS || 'kafka:9092'],
});

const producer: Producer = kafka.producer();

export async function publishUserRegisteredEvent(user: { id: number; login: string }) {
  try {
    await producer.connect();
    await producer.send({
      topic: 'user-registered',
      messages: [
        { value: JSON.stringify(user) },
      ],
    });
    console.log('[LOG]: Event UserRegistered published to Kafka');
  } catch (error) {
    console.error('[ERROR]: Failed to publish event to Kafka:', error);
  } finally {
    await producer.disconnect();
  }
}
