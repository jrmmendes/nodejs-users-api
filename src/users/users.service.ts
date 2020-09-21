import bcrypt from 'bcryptjs';
import { inject, injectable } from "inversify";
import jwt from 'jsonwebtoken';
import { Types } from "~/core/types";
import { UserDocument, UserRegisterData } from "./users.entity";
import { UserRepository } from "./users.repository";


@injectable()
export class UserService {
  constructor(
    @inject(Types.UserRepository) private repository: UserRepository,
  ){ }

  async isEmailRegistered(email: string): Promise<boolean> {
    return this.repository.exists({ email });
  }

  async registerUser(data: UserRegisterData): Promise<UserDocument> {
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
  async list(): Promise<UserDocument[]> {
    return this.repository.findAll();
  }
}
