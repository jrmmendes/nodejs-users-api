import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import morgan from 'morgan';

export const bootstrap = (container: Container): Application => {
  const app = new InversifyExpressServer(container);
  app.setConfig(app => {
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(express.json());
  });

  return app.build();
}
