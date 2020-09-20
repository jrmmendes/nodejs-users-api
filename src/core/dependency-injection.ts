import 'reflect-metadata';
import { Container } from 'inversify';
import { Types } from '~/core/types';

import { ExampleService } from '~/example/example.service';

import '../example/example.controller';

export const getDependencyContainer = () => {
  const container = new Container();
  container
    .bind<ExampleService>(Types.ExampleService)
    .to(ExampleService);

  return container;
}

