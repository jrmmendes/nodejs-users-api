import { ExampleService } from './example.service';

describe('Example Unit Tests', () => {
  it('Should return hello word', async () => {
    const service = new ExampleService();
    const message = await service.getHelloMessage();
    expect(message).toBe('hello world again');
  });
})
