import { NextFunction, Request, Response } from 'express';
import { authMiddleware } from './core/auth.middleware';
import container from './core/inversify.config';
import { Types } from './core/types';
import { UserService } from './users/users.service';

describe('Auth Middleware Tests', () => {
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
});
