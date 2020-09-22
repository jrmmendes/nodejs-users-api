import 'reflect-metadata';
import bcrypt from 'bcryptjs';
import http from 'supertest';
import { bootstrap } from './application';
import faker from 'faker';
import { UserRepository } from './users/users.repository';
import container from './core/inversify.config';
import { Types } from './core/types';
import { Application } from 'express';
import { UserDocument, UserRegistrationData } from './users/users.entity';

describe('User endpoint tests', () => {
  let repositoryMock: UserRepository;
  let app: Application;

  beforeAll(() => {
    faker.setLocale('pt_BR');

    repositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      exists: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
    } as any;

    container
      .rebind<UserRepository>(Types.UserRepository)
      .toConstantValue(repositoryMock);

    app = bootstrap(container);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('User Sign-Up', () => {
    const testData: UserRegistrationData = {
      nome: faker.name.findName(),
      email: faker.internet.email('user'),
      senha: faker.internet.password(15, false),
      telefones: [{
        numero: '911224455',
        ddd: '81',
      }],
    };

    it('When passed email is not available, expect 400 and error message', async () => {
      jest.spyOn(repositoryMock, 'exists').mockResolvedValue(true);

      const response = await http(app).post('/users/sign-up').send(testData);

      expect(response.status).toBe(400);
      expect(response.body.mensagem).toBe('E-mail já existente');
    });
  });

  describe('User Sign-In', () => {
    const testCredentials = {
      email: faker.internet.email('user'),
      senha: faker.internet.password(15, false),
    };

    it('When invalid email, expect 401 with error message', async () => {
      jest
        .spyOn(repositoryMock, 'exists')
        .mockImplementation(({ email }) => Promise.resolve(email === faker.internet.email('other-user')));

      const response = await http(app)
        .post('/users/sign-in')
        .send(testCredentials);

      expect(response.status).toBe(401);
      expect(response.body.mensagem).toBe('Usuário e/ou senha inválidos')
    });

    it('When invalid password, expect 401 with error message', async () => {
      const testHash = await bcrypt.hash(faker.internet.password(10), 10);

      jest
        .spyOn(repositoryMock, 'exists')
        .mockImplementation(({ email }) => Promise.resolve(email === testCredentials.email));

      jest
        .spyOn(repositoryMock, 'findById')
        .mockResolvedValue({
          _id: faker.random.alphaNumeric(),
          email: testCredentials.email,
          passwordHash: testHash,
        } as UserDocument);

      const response = await http(app)
        .post('/users/sign-in')
        .send(testCredentials);

      expect(response.status).toBe(401);
      expect(response.body.mensagem).toBe('Usuário e/ou senha inválidos')
    });
  });
});
