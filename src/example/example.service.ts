import 'reflect-metadata';

import { inject, injectable } from 'inversify';
import { Types } from '~/core/types';
import { ExampleRepository } from './example.repository';

@injectable()
export class ExampleService {
  constructor(
    @inject(Types.ExampleRepository) private repository: ExampleRepository
  ) {}
  public async getHelloMessage(): Promise<string> {
    return 'hello world again';
  }
  public async registerExample(): Promise<any> {
    return this.repository.create({ name: 'test' });
  }
}
