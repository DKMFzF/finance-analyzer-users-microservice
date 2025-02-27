import dotenv from "dotenv";
import { z } from "zod";
import logger from "../utils/logger/logger";

dotenv.config();

/**
 * глобальное переменное окружение
 */

const configSchema = z.object({
  POST: z.string().default("4000"),
});

const envConfig = configSchema.safeParse(process.env);

if (!envConfig.success) {
  logger.error("[ERROR]: Invalid environment variables:", envConfig.error.format());
  process.exit(1);
}

export const config = envConfig.data;
