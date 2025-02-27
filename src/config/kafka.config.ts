import { Kafka } from 'kafkajs';
import { z } from "zod";
import logger from "../utils/logger/logger";

/**
 * глобальное переменное окружение
 */

const configKafkaSchema = z.object({
  KAFKA_BROKERS: z.string().default('kafka:9092'),
});

if (!configKafkaSchema) {
  logger.error("[ERROR]: Kfake invalid environment variables");
  process.exit(1);
}

const kafka = new Kafka({
  clientId: 'user-service',
  brokers: [process.env.KAFKA_BROKERS || 'kafka:9092'],
});

if (!kafka) {
  logger.error("[ERROR]: Kafka not connected");
  process.exit(1);
}

export const producer = kafka.producer();