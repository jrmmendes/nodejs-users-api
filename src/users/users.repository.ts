import { inject } from "inversify";
import { DatabaseClient } from "~/core/database";
import { Repository } from "~/core/repository";
import { Types } from "~/core/types";
import { User, UserDocument } from "./users.entity";

export class UserRepository extends Repository<User, UserDocument> {
  constructor(
    @inject(Types.DatabaseClient) databaseClient: DatabaseClient,
  ){
    super(
      databaseClient,
      'User',
      {
        nome: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        hashSenha: {
          type: String,
          required: true,
        },
        telefones: [
          {
            numero: {
              type: String,
              required: true,
            },
            ddd: {
              type: String,
              required: true,
            },
          },
        ],
        ultimo_login: {
          type: Date,
          default: Date.now,
        },
        token: {
          type: String,
          required: true,
        }
      }
    );
  }
}
