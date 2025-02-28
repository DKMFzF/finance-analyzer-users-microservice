import express from "express";
import router from './routes/users.routes';
import logger from "./utils/logger/logger";
import LOGS from "./utils/custom.logs";
import { errorHandler } from "./middleware/error.middleware";

const app = express();
app.use(express.json());

app.use('/', router);
app.use(errorHandler);

logger.info(LOGS.SERVICE_INIT);

export default app;
