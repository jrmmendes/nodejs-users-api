import 'reflect-metadata';
import { Container } from 'inversify';
import { Types } from '~/core/types';

import { ExampleService } from '~/example/example.service';

import '../example/example.controller';
import { ExampleRepository } from '~/example/example.repository';

export const getDependencyContainer = () => {
  const container = new Container();

  container.bind<ExampleService>(Types.ExampleService)
    .to(ExampleService);

  container.bind<ExampleRepository>(Types.ExampleRepository)
    .to(ExampleRepository).inSingletonScope();

  return container;
}

