import 'reflect-metadata';
import http from 'supertest';
import { bootstrap } from './application';
import faker from 'faker';
import { UserService } from './users/users.service';
import { UserRepository } from './users/users.repository';
import container from './core/inversify.config';
import { DatabaseClient } from './core/database';
import { Types } from './core/types';
import { Application } from 'express';

describe('User endpoint tests', () => {
  let repositoryMock: UserRepository;
  let service: UserService;
  let app: Application;

  beforeAll(() => {
    faker.setLocale('pt_BR');

    repositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      exists: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    } as any;

    container
      .rebind<UserRepository>(Types.UserRepository)
      .toConstantValue(repositoryMock);

    service = new UserService(repositoryMock);

    app = bootstrap(container);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('User Sign-In', () => {
    it('When invalid email, expect 401 with error message', async () => {
      jest.spyOn(repositoryMock, 'exists').mockResolvedValue(false);

      const response = await http(app)
        .post('/users/sign-in');

      expect(response.status).toBe(401);
      expect(response.body.mensagem).toBe('Usuário e/ou senha inválidos')
    });
  });
});
