import { Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, httpPost, requestBody, response } from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/dts/results";
import { authMiddleware } from "~/core/auth.middleware";
import { Types } from "~/core/types";
import { UserDocument, UserRegistrationData } from "./users.entity";
import { UserService } from "./users.service";

@controller('/users')
export class UserControler extends BaseHttpController {
  constructor(
    @inject(Types.UserService) private service: UserService,
  ){ 
    super();
  }

  private serializeUserData(user: UserDocument) {
    return {
      id: user._id,
      nome: user.name,
      email: user.email,
      telefones: user.phoneNumbers,
      token: user.token,
      data_criacao: user.createdAt,
      data_atualizacao: user.updatedAt,
      ultimo_login: user.lastLogin,
    }
  }

  @httpPost('/sign-up')
    async signUp(@requestBody() data: UserRegistrationData): Promise<JsonResult> {
    if (await this.service.isEmailRegistered(data.email)) {
      return this.json({ mensagem: 'E-mail já existente' }, 400);
    }

    const user = await this
      .service
      .registerUser(data);

    return this.json(this.serializeUserData(user), 201);
  }

  @httpPost('/sign-in')
  async signIn(@requestBody() credentials: { email: string, senha: string }): Promise<JsonResult> {
    const { email, senha: password } = credentials;
    const user = await this
      .service
      .getUserFromCredentials({ email, password });

    if (!user) {
      return this.json({
        mensagem: 'Usuário e/ou senha inválidos'
      }, 401);
    }
    user.token = await this.service.generateJwtToken(user, '30min');
    return this.json(this.serializeUserData(user), 200);
  }

  @httpGet('/buscar-usuario/:id', authMiddleware)
  async searchUser(@response() response: Response): Promise<JsonResult> {
    return this.json(response.locals.user, 200);
  }
}
