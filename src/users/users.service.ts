import bcrypt from 'bcryptjs';
import { inject, injectable } from "inversify";
import jwt from 'jsonwebtoken';
import { Types } from "~/core/types";
import { UserCredentials, UserDocument, UserRegistrationData } from "./users.entity";
import { UserRepository } from "./users.repository";


@injectable()
export class UserService {
  constructor(
    @inject(Types.UserRepository) private repository: UserRepository,
  ){ }

  async isEmailRegistered(email: string): Promise<boolean> {
    return this.repository.exists({ email });
  }

  async getUserFromCredentials({ email, password }: UserCredentials): Promise<UserDocument | void> {
    const user = await this.repository.findByEmail(email);
    if (user && bcrypt.compare(password, user.passwordHash)) {
      return user;
    }
  }

  async registerUser(data: UserRegistrationData): Promise<UserDocument> {
    const senhaHash = await bcrypt.hash(data.senha, 10);
    const token = jwt.sign(
      { email: data.email },
      process.env.APP_SECRET || 'secret',
      { expiresIn: '30min' },
    )
      
    return this.repository.create({
      name: data.nome,
      email: data.email,
      phoneNumbers: data.telefones,
      passwordHash: senhaHash,
      token,
    });
  }
  async list(): Promise<UserDocument[]> {
    return this.repository.findAll();
  }

  async findUser(email: string): Promise<UserDocument | null> {
    return this.repository.findByEmail(email);
  }
}
