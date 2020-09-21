import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { inject, injectable } from "inversify";
import { Types } from "~/core/types";
import { UserRegisterData } from "./users.entity";
import { UserRepository } from "./users.repository";

@injectable()
export class UserService {
  constructor(
    @inject(Types.UserRepository) private repository: UserRepository,
  ){ }

  async registerUser(data: UserRegisterData): Promise<any> {
    const senhaHash = await bcrypt.hash(data.senha, 10);
    const token = jwt.sign(
      { email: data.email },
      process.env.APP_SECRET || 'secret',
      { expiresIn: '30min' },
    )
      
    return this.repository.create({
      nome: data.nome,
      email: data.email,
      telefones: data.telefones,
      senhaHash,
      token,
    });
  }
}
