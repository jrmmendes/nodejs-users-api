import { Schema, SchemaDefinition } from "mongoose";

export const UserSchema: SchemaDefinition = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
    select: false,
  },
  phoneNumbers: [
    new Schema({
      number: {
        type: String,
        required: true,
      },
      ddd: {
        type: String,
        required: true,
      },
    }, { _id: false }),
  ],
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
  }
};
