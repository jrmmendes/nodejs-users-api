import 'reflect-metadata';
import { Container } from 'inversify';
import { Types } from '~/core/types';

import '../users/users.controller';
import { UserService } from '~/users/users.service';
import { UserRepository } from '~/users/users.repository';

const container = new Container();

container.bind<UserService>(Types.UserService)
.to(UserService);

container.bind<UserRepository>(Types.UserRepository)
.to(UserRepository).inSingletonScope();

export default container;
