import { inject } from "inversify";
import { BaseHttpController, controller, httpPost, requestBody } from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/dts/results";
import { Types } from "~/core/types";
import { UserCredentials, UserDocument, UserRegistrationData } from "./users.entity";
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
    if (this.service.isEmailRegistered(data.email)) {
      return this.json({ mensagem: 'E-mail já existente' }, 400);
    }

    const user = await this
      .service
      .registerUser(data);

    return this.json(this.serializeUserData(user), 201);
  }

  @httpPost('/sign-in')
  async signIn(@requestBody() credentials: UserCredentials): Promise<JsonResult> {
    const user = await this.service.getUserFromCredentials(credentials);
    if (!user) {
      return this.json({ mensagem: 'Usuário e/ou senha inválidos' }, 401);
    }
    return this.json(this.serializeUserData(user), 200);
  }
}
