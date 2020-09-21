import { inject } from "inversify";
import { DatabaseClient } from "~/core/database";
import { Repository } from "~/core/repository";
import { Types } from "~/core/types";
import { User, UserDocument } from "./users.entity";
import { UserSchema } from "./users.schema";

export class UserRepository extends Repository<User, UserDocument> {
  constructor(
    @inject(Types.DatabaseClient) databaseClient: DatabaseClient,
  ){
    super(
      databaseClient,
      'User',
      UserSchema,
    );
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.Model.findOne({ email });
  }
}
