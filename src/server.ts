import logger from './utils/logger/logger';
import LOGS from "./utils/custom.logs";
import app from "./app";
import config from "./config/index.config";

/**
 * start server
 */

const PORT = config.PORT;

app.listen(PORT, () => logger.info(LOGS.SERVICE_START, PORT));
