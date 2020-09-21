import { Document } from "mongoose";

type PhoneNumber = {
  numero: string,
  ddd: string,
}

export interface UserRegisterData {
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
  nome: string;
  email: string;
  token?: string;
  telefones: PhoneNumber[]
  senhaHash?: string;
  ultimo_login?: string;
  data_criacao?: string;
  data_atualizacao?: string;
}

export type UserDocument = User & Document;
