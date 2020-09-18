import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

export const configure = (app: Application) => {
  app.use(cors());
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.json());
}
