import faker from 'faker';
import { UserRegistrationData } from "./users.entity";
import { UserRepository } from "./users.repository";
import { UserService } from "./users.service";

describe('User Service', () => {
  let repositoryMock: UserRepository;
  let service: UserService;
  let validRegisterData: UserRegistrationData;

  beforeAll(() => {
    faker.setLocale('pt_BR');

    repositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    } as any;
    service = new UserService(repositoryMock);

    validRegisterData = {
      nome: faker.name.findName(),
      email: faker.internet.email(),
      senha: faker.internet.password(15, false),
      telefones: [{
        numero: faker.phone.phoneNumber().toString(),
        ddd: "81",
      }],
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('When valid data passed to user registration service, expect to call repository with correct data', async () => {
    jest
    .spyOn(repositoryMock, 'create')
    .mockImplementation((data: any) => Promise.resolve({
      _id: faker.random.alphaNumeric(),
      ...data
    }));

    jest
    .spyOn(repositoryMock, 'save')
    .mockImplementation((document: any) => Promise.resolve({
      ...document,
      lastUpdate: Date.now,
    }));

    const data = await service.registerUser(validRegisterData);
    expect(repositoryMock.create).toBeCalled();
    expect(data.passwordHash).toEqual(expect.any(String));
    expect(data.token).toEqual(expect.any(String));
  });
});
