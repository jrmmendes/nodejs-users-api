import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { TYPES } from '~core/types';
import { ExampleService } from './example.service';

@controller('/examples')
export class ExampleController {

  constructor(@inject(TYPES.ExampleService) private exampleService: ExampleService) {}

  @httpGet('/')
  async helloMessage(): Promise<{ message: string }> {
    const message = await this.exampleService.getHelloMessage();
    return { message };
  }
}
