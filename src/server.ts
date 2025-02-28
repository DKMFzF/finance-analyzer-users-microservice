import logger from './utils/logger/logger';
import LOGS from "./utils/custom.logs";
import app from "./app";
import config from "./config/index.config";
import initDB from './data/db.init';

const PORT = config.PORT;
const startServer = async () => {
  await initDB();
  app.listen(PORT, () => logger.info(LOGS.SERVICE_START, PORT));
};

startServer();
