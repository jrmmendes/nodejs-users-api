import { injectable } from 'inversify';

@injectable()
export class ExampleService {
  public async getHelloMessage(): Promise<string> {
    return 'hello world again';
  }
}
