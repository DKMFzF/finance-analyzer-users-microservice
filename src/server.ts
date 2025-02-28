import logger from './utils/logger/logger';
import LOGS from "./utils/custom.logs";
import app from "./app";
import config from "./config/index.config";
import initDB from './data/db.init';

/**
 * start server
 */

const PORT = config.PORT;
const startServer = async () => {
  await initDB();
  app.listen(config.PORT, () => logger.info(`[LOG]: Server started on port ${PORT}`));
};

startServer();
