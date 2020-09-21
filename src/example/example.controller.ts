import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { Types } from '~/core/types';
import { ExampleService } from './example.service';

@controller('/examples')
export class ExampleController {

  constructor(@inject(Types.ExampleService) private exampleService: ExampleService) {}

  @httpGet('/')
  async helloMessage(): Promise<{ message: string }> {
    const message = await this.exampleService.getHelloMessage();
    return { message };
  }

  @httpGet('/register')
  async create(): Promise<any> {
    return this.exampleService.registerExample();
  }
}
