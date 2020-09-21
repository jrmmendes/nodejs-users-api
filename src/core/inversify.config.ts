import 'reflect-metadata';
import { Container } from 'inversify';
import { Types } from '~/core/types';

import { ExampleService } from '~/example/example.service';

import '../example/example.controller';
import '../users/users.controller';
import { ExampleRepository } from '~/example/example.repository';
import { UserService } from '~/users/users.service';
import { UserRepository } from '~/users/users.repository';

const container = new Container();

container.bind<ExampleService>(Types.ExampleService)
.to(ExampleService);

container.bind<ExampleRepository>(Types.ExampleRepository)
.to(ExampleRepository).inSingletonScope();

container.bind<UserService>(Types.UserService)
.to(UserService);

container.bind<UserRepository>(Types.UserRepository)
.to(UserRepository).inSingletonScope();

export default container;
