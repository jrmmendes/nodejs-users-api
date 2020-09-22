import { Document } from "mongoose";

type Telefone = { numero: string, ddd: string };
export interface UserRegistrationData {
  nome: string;
  email: string;
  senha: string;
  telefones: Telefone[],
}

export interface UserCredentials {
  email: string;
  password: string;
}

type PhoneNumber = { number: string, ddd: string };
export interface User {
  name: string;
  email: string;
  token?: string;
  phoneNumbers: PhoneNumber[],
  passwordHash: string;
  lastLogin: Date;
  createdAt?: string;
  updatedAt?: string;
}

export type UserDocument = User & Document;
