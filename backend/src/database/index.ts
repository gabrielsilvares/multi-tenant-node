import { createConnection } from 'typeorm';
import AppError from '@errors/AppError';

createConnection()
  .then(() => {
    console.log('Connected to the database');
    import('../server');
  })
  .catch(() => new AppError('Unable to connect to the database'));
