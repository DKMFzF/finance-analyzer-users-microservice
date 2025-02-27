import express from "express";
import router from './routes/users.routes';
import logger from "./utils/logger/logger";
import LOGS from "./utils/custom.logs";

/**
 * init sevice
 */

const app = express();
app.use(express.json());

app.use('/', router);

logger.info(LOGS.SERVICE_INIT);

export default app;
