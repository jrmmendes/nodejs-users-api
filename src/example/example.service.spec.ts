import { ExampleRepository } from "./example.repository";
import { ExampleService } from "./example.service";

describe('Example Unit Tests', () => {
  let exampleRepositoryMock: ExampleRepository;
  let service: ExampleService;

  beforeAll(() => {
    exampleRepositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    } as any;
    service = new ExampleService(exampleRepositoryMock);
  });
  it('Should return hello word', async () => {
    const message = await service.getHelloMessage();
    expect(message).toBe('hello world again');
    expect(true).toBe(true);
  });

  it('Should create examples', async ()=> {
    service.registerExample();
    expect(exampleRepositoryMock.create).toBeCalled();
  });
})
