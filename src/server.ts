import express from 'express';
import userRoutes from './routes/user.routes';
// import { logInfo } from './utils/logger';

const app = express();
app.use(express.json());

const PORT: number = Number(process.env.PORT) || 4000;

app.use('/', userRoutes);

app.listen(PORT, () => console.log("ИДЁТ ВОЗНЯ"));
