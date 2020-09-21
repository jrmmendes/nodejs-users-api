import { Document } from "mongoose";

type PhoneNumber = {
  numero: string,
  ddd: string,
}

export interface UserRegistrationData {
  nome: string;
  email: string;
  senha: string;
  telefones: PhoneNumber[]
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  token: string;
  phoneNumbers: PhoneNumber[]
  passwordHash: string;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type UserDocument = User & Document;
