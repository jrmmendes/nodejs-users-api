import 'reflect-metadata';
import './ioc';

import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { configure } from './config';
import { ExampleService } from './example/example.service';
import { TYPES } from './types';

const container = new Container();
container.bind<ExampleService>(TYPES.ExampleService).to(ExampleService);

const server = new InversifyExpressServer(container);
server.setConfig(configure);

const app = server.build();
app.listen(process.env.PORT || 3000, () => console.log('Ready'));
