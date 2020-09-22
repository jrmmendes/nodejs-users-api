import { NextFunction, Request, Response } from "express";
import container from '~/core/inversify.config';
import { UserService } from "~/users/users.service";
import { Types } from "./types";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const userService = container.get<UserService>(Types.UserService);
  const { token } = req;

  if (!token) {
    return res.status(401).send({ mensagem: 'Não autorizado' });
  }
  const user = await userService.getUserFromJwtToken(req.params.id, token);
  if (!user) {
    return res.status(401).send({ mensagem: 'Não autorizado' });
  }

  const minutesSinceLastLogin = (
    Date.now() - user.lastLogin.getTime()
  ) / 60000;

  if (minutesSinceLastLogin >= 30) {
    return res.status(401).send({ mensagem: 'Sessão inválida' });
  }

  res.locals.user = user;
  return next();
}
