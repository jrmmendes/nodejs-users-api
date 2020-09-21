import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, httpPost, requestBody } from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/dts/results";
import { Types } from "~/core/types";
import { User, UserCredentials, UserRegisterData } from "./users.entity";
import { UserService } from "./users.service";

@controller('/users')
export class UserControler extends BaseHttpController {
  constructor(
    @inject(Types.UserService) private service: UserService,
  ){ 
    super();
  }

  @httpPost('/sign-up')
    async signUp(@requestBody() data: UserRegisterData): Promise<any> {
    if (this.service.isEmailRegistered(data.email)) {
      return this.json({ mensagem: 'E-mail já existente' }, 401);
    }

    const user = await this.service.registerUser(data);
    return {
      id: user._id,
      nome: user.nome,
      email: user.email,
      telefones: user.telefones,
      token: user.token,
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: user.ultimo_login,
    }
  }
  @httpGet('/')
  async list(): Promise<User[]> {
    return this.service.list();
  }

  @httpPost('/sign-in')
  async signIn(@requestBody() credentials: UserCredentials): Promise<User| JsonResult> {
    if (!await this.service.isEmailRegistered(credentials.email)) {
      return this.json({ mensagem: 'Usuário e/ou senha inválidos' }, 401);
    }

    return {} as User;
  }
}
