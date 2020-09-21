import { UserRegisterData } from "./users.entity";
import { UserRepository } from "./users.repository";
import { UserService } from "./users.service";
import faker from 'faker';

describe('User Service -> Managing Users', () => {
  let repositoryMock: UserRepository;
  let service: UserService;

  beforeAll(() => {
    faker.setLocale('pt_BR');
    repositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    } as any;
    service = new UserService(repositoryMock);
  });
  
  it.only('When valid data passed to .create, expect to call repository correct method', async () => {
    const testData: UserRegisterData = {
      nome: faker.name.findName(),
      email: faker.internet.email(),
      senha: faker.internet.password(15, false),
      telefones: [{
        numero: faker.phone.phoneNumber().toString(),
        ddd: "81",
      }],
    };

    jest
      .spyOn(repositoryMock, 'create')
      .mockImplementation((data: any) => Promise.resolve({
        id: faker.random.alphaNumeric(),
        ...data 
      }));

    await service.registerUser(testData);
    expect(repositoryMock.create).toBeCalledWith();
  });
});
