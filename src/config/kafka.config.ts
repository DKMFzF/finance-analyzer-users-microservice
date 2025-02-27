import { Kafka, Partitioners } from 'kafkajs';
import logger from '../utils/logger/logger';
import dotenv from 'dotenv';

dotenv.config();

/**
 * подгрузка конфига для kafka
 */

logger.info("[LOG]: Loading kafka.config environment variables");

if (!process.env.KAFKA_BROKERS) {
  throw new Error("KAFKA_BROKERS environment variable is not defined");
}

const kafka = new Kafka({
  clientId: 'user-service',
  brokers: process.env.KAFKA_BROKERS.split(','), // Разделяем строку на массив
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

export default producer;
