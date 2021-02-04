import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';

import routes from './routes';
import AppError from '@errors/AppError';

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.log(`Error >> ${err}`);

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});
export default app;