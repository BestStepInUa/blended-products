import dns from 'dns';
// Примусово використовуємо публічні DNS для вирішення SRV записів Atlas
// Це фікс для помилки querySrv ECONNREFUSED на Windows [citation:7]
dns.setServers(['1.1.1.1', '8.8.8.8']);

import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import logger from './middlewares/logger.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import productRouter from './routers/productRoutes.js';
import authRouter from './routers/authRoutes.js';

import 'dotenv/config';

const app = express();

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.use(authRouter);
app.use(productRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`🎉 Server running successfully on ${port} port`);
});
