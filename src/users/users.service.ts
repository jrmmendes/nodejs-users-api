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
    return this.repository.create(data);
  }
}
