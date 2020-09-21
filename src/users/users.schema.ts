import { Schema, SchemaDefinition } from "mongoose";

export const UserSchema: SchemaDefinition = {
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senhaHash: {
    type: String,
    required: true,
    select: false,
  },
  telefones: [
    new Schema({
      numero: {
        type: String,
        required: true,
      },
      ddd: {
        type: String,
        required: true,
      },
    }, { _id: false }),
  ],
  ultimo_login: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
    required: true,
  }
};
