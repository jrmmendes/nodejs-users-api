import { UserRegisterData } from "./users.entity";
import { UserRepository } from "./users.repository";
import { UserService } from "./users.service";
import faker from 'faker';

describe('User Service -> Managing Users', () => {
  let repositoryMock: UserRepository;
  let service: UserService;
  let validRegisterData: UserRegisterData;

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

  it('When valid data passed to .registerUser, expect to call repository correct method', async () => {
    jest
    .spyOn(repositoryMock, 'create')
    .mockImplementation((data: any) => Promise.resolve({
      id: faker.random.alphaNumeric(),
      ...data 
    }));

    await service.registerUser(validRegisterData);
    expect(repositoryMock.create).toBeCalled();
  });

  it('When valid data passed to .registerUser, expect to generate login related fields', async () => {
    jest
    .spyOn(repositoryMock, 'create')
    .mockImplementation((data: any) => Promise.resolve({
      id: faker.random.alphaNumeric(),
      ...data 
    }));

    await service.registerUser(validRegisterData);

    expect(repositoryMock.create).toBeCalledWith({
      nome: validRegisterData.nome,
      email: validRegisterData.email,
      hashSenha: expect.any(String),
      ultimo_login: expect.any(Date),
      token: expect.any(String),
      telefones: validRegisterData.telefones,
    });
  });
});
