import Joi from 'joi';
import { authMiddleware } from './core/auth.middleware';
import container from './core/inversify.config';
import { Types } from './core/types';
import { validationMiddleware } from './core/validation.middleware';
import { UserService } from './users/users.service';

describe('Middleware Tests', () => {
  let usersServiceMock: UserService;

  const getHttpMocks = () => {
    const res = {} as any;
    res.locals = {} as any;
    res.status = jest.fn().mockReturnThis();
    res.send = jest.fn();
    const req = {} as any;
    const next = jest.fn();

    return { req, res, next };
  }

  beforeAll(() => {
    usersServiceMock = {
      getUserFromJwtToken: jest.fn()
    } as any;

    container
    .rebind<UserService>(Types.UserService)
    .toConstantValue(usersServiceMock);
  });

  describe('Auth middleware tests', () => {
    it('When request token is missing, expect to send response with 401 and error message', async () => {
      const { req, res, next } = getHttpMocks();

      await authMiddleware(req, res, next);

      expect(res.status).toBeCalledWith(401);
      expect(res.send).toBeCalledWith({ mensagem: 'Não autorizado' });
      expect(next).not.toBeCalled();
    });

    it('When user not found, expect to send response with 401 and error message', async () => {
      const { res, next } = getHttpMocks();
      const req = { token: 'anything', params: { id: 'anything' } } as any;
      jest.spyOn(usersServiceMock, 'getUserFromJwtToken').mockResolvedValue(undefined);

      await authMiddleware(req, res, next);

      expect(res.status).toBeCalledWith(401);
      expect(res.send).toBeCalledWith({ mensagem: 'Não autorizado' });
      expect(next).not.toBeCalled();
    });

    it('When token valid and user found, expect to set res.locals.user ', async () => {
      const { res, next } = getHttpMocks();
      const req = { token: 'anything', params: { id: 'anything' } } as any;
      const testUser = {
        lastLogin: new Date(),
      } as any;
      jest.spyOn(usersServiceMock, 'getUserFromJwtToken').mockResolvedValue(testUser);

      await authMiddleware(req, res, next);

      expect(res.status).not.toBeCalled();
      expect(res.send).not.toBeCalled();
      expect(res.locals.user).toBe(testUser);
      expect(next).toBeCalled();
    });
    it('When request token is missing, expect to send response with 401 and error message', async () => {

      const { req, res, next } = getHttpMocks();

      await authMiddleware(req, res, next);

      expect(res.status).toBeCalledWith(401);
      expect(res.send).toBeCalledWith({ mensagem: 'Não autorizado' });
      expect(next).not.toBeCalled();
    });

    it('When user not found, expect to send response with 401 and error message', async () => {
      const { res, next } = getHttpMocks();
      const req = { token: 'anything', params: { id: 'anything' } } as any;
      jest.spyOn(usersServiceMock, 'getUserFromJwtToken').mockResolvedValue(undefined);

      await authMiddleware(req, res, next);

      expect(res.status).toBeCalledWith(401);
      expect(res.send).toBeCalledWith({ mensagem: 'Não autorizado' });
      expect(next).not.toBeCalled();
    });

    it('When user last login is more than 30min ago, expect send response with 401 and error message ', async () => {
      const { res, next } = getHttpMocks();
      const req = { token: 'anything', params: { id: 'anything' } } as any;

      const lastLogin = new Date();
      lastLogin.setMinutes(lastLogin.getMinutes() - 30);

      const testUser = {
        lastLogin,
      } as any;
      jest.spyOn(usersServiceMock, 'getUserFromJwtToken').mockResolvedValue(testUser);

      await authMiddleware(req, res, next);

      expect(res.status).toBeCalledWith(401);
      expect(res.send).toBeCalledWith({ mensagem: 'Sessão inválida' });
      expect(next).not.toBeCalled();
    });

    it('When last login is less than 30min ago, token and ID are valid, expect to set locals.user and call next', async () => {
      const { res, next } = getHttpMocks();
      const req = { token: 'anything', params: { id: 'anything' } } as any;

      const lastLogin = new Date();
      lastLogin.setMinutes(lastLogin.getMinutes() - 29);

      const testUser = {
        lastLogin,
      } as any;
      jest.spyOn(usersServiceMock, 'getUserFromJwtToken').mockResolvedValue(testUser);

      await authMiddleware(req, res, next);

      expect(res.status).not.toBeCalled();
      expect(res.send).not.toBeCalled();
      expect(res.locals.user).toBe(testUser);
      expect(next).toBeCalled();
    });
  });

  describe('Validation middleware tests', () => {
    it('When validation fails, expect to send response with 400 and errors', () => {
      const testSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      });

      const { req, res, next } = getHttpMocks();
      req.body = {};

      validationMiddleware(testSchema)(req, res, next);

      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith({
        mensagem: expect.any(String),
        erros: expect.any(Array),
      });
    })
  });
});
