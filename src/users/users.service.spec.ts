import faker from 'faker';
import bcrypt from 'bcryptjs';
import { UserDocument, UserRegistrationData } from "./users.entity";
import { UserRepository } from "./users.repository";
import { UserService } from "./users.service";

describe('User Service', () => {
  let repositoryMock: UserRepository;
  let service: UserService;
  let validRegisterData: UserRegistrationData;

  beforeAll(() => {
    faker.setLocale('pt_BR');

    repositoryMock = {
      create: jest.fn().mockImplementation((data: any) => Promise.resolve({
        _id: faker.random.alphaNumeric(),
        ...data
      })),
      save: jest.fn().mockImplementation((document: any) => Promise.resolve({
        ...document,
        lastUpdate: Date.now,
      })),
      findAll: jest.fn(),
      findById: jest.fn(),
      findOne: jest.fn(),
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

  describe('User Registration', () => {
    it('When valid data passed to user registration service, expect to call repository with correct data', async () => {
      const data = await service.registerUser(validRegisterData);
      expect(repositoryMock.create).toBeCalled();
      expect(data.passwordHash).toEqual(expect.any(String));
      expect(data.token).toEqual(expect.any(String));
    });
  });

  describe('Credential Validation', () => {
    const testCredentials = {
      email: faker.internet.email('credentials-tester'),
      password: faker.internet.password(15, false),
    };

    it('When valid email and password, expect to return user and update fields', async () => {
      const oldLastLogin = faker.date.recent(3);
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue({
        name: faker.name.findName(),
        phoneNumbers: [],
        email: testCredentials.email,
        passwordHash: await bcrypt.hash(testCredentials.password, 10),
        lastLogin: oldLastLogin,
      } as any);

      const user = await service.getUserFromCredentials(testCredentials) as UserDocument;
      expect(user).toBeDefined();
      expect(user.lastLogin).not.toEqual(oldLastLogin);
      expect(repositoryMock.save).toBeCalledTimes(1);
    });

    it('When invalid email, expect to return nothing', async () => {
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue(null);

      const user = await service.getUserFromCredentials(testCredentials);
      expect(user).not.toBeDefined();
    });

    it('When invalid password, expect to return nothing', async () => {
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValue({
        name: faker.name.findName(),
        phoneNumbers: [],
        email: testCredentials.email,
        passwordHash: faker.random.alphaNumeric(5),
      } as any);

      const user = await service.getUserFromCredentials(testCredentials);
      expect(user).not.toBeDefined();
    });

    it('When token and ID are valid and token is equal to user token, expect to return user', async () => {
      const testUser = {
        _id: faker.random.alphaNumeric(),
        token: faker.random.alphaNumeric(),
        name: faker.name.findName(),
      }
      jest.spyOn(repositoryMock, 'findById').mockResolvedValue(testUser as any);

      const user = await service.getUserFromJwtToken(testUser._id, testUser.token);

      expect(repositoryMock.findById).toBeCalled();
      expect(user).toBe(testUser);
    });

    it('When token is different to user token, expect to return nothing', async () => {
      const testUser = {
        _id: faker.random.alphaNumeric(),
        token: faker.random.alphaNumeric(6),
        name: faker.name.findName(),
      }
      jest.spyOn(repositoryMock, 'findById').mockResolvedValue(testUser as any);

      const user = await service.getUserFromJwtToken(testUser._id, faker.random.alphaNumeric(5));
      expect(user).toBeUndefined();
    });
  });
});
