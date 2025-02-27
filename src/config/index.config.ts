import dotenv from "dotenv";

dotenv.config();

/**
 * добавление конфига для сервиса
 */

const config = {
  PORT: process.env.PORT || 4000,
};

export default config;
