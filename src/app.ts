import express from "express";
import router from './routes/users.routes';

/**
 * init sevice
 */

const app = express();
app.use(express.json());

app.use('/', router);

export default app;
