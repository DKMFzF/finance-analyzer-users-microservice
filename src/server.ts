import { config } from "./config/index.config";
import app from "./app";
import logger from "./utils/logger/logger";
import { LOGS } from "./utils/custom.logs";

const PORT = config.POST;

app.listen(PORT, () => logger.info(LOGS.SERVICE_START, PORT));
