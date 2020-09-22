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

  async generateJwtToken(user: UserDocument, expiresIn: string): Promise<string> {
    const token = jwt.sign(
      { userId: user._id },
      process.env.APP_SECRET || 'defaultsecret',
      { expiresIn }
    );

    return bcrypt.hash(token, 10);
  }

  async getUserFromCredentials({ email, password }: UserCredentials): Promise<UserDocument | void> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user!.passwordHash);
    if (isPasswordValid) {
      user.lastLogin = Date.now().toString();
      return user.save();
    }
  }

  async registerUser(data: UserRegistrationData): Promise<UserDocument> {
    const passwordHash = await bcrypt.hash(data.senha, 10);
      
    const user = await this.repository.create({
      name: data.nome,
      email: data.email,
      phoneNumbers: data.telefones.map(telefone => ({
        number: telefone.numero,
        ddd: telefone.ddd,
      })),

      passwordHash,
    });

    user.token = await this.generateJwtToken(user, '30min');
    return this.repository.save(user);
  }

  async list(): Promise<UserDocument[]> {
    return this.repository.findAll();
  }

  async findUser(email: string): Promise<UserDocument | null> {
    return this.repository.findByEmail(email);
  }
}
