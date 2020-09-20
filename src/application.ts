import 'reflect-metadata';

import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import morgan from 'morgan';

import { TYPES } from '~core/types';

import { ExampleService } from './example/example.service';

const buildDependencyContainer = () => {
  const container = new Container();
  container
    .bind<ExampleService>(TYPES.ExampleService)
    .to(ExampleService);
  
  return container;
}

export const bootstrap = (): Application => {
  const app = new InversifyExpressServer(buildDependencyContainer());
  app.setConfig(app => {
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(express.json());
  });

  return app.build();
}
