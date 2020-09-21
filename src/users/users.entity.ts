import { Document } from "mongoose";

export interface UserRegisterData {
  nome: string;
  email: string;
  senha: string;
  telefones: [
    {
      numero: string,
      ddd: string,
    }
  ]
}

export interface User {
  id?: string;
  nome: string;
  email: string;
  token?: string;
  ultimo_login?: string;
  data_criacao?: string;
  data_atualizacao?: string;
}

export interface UserDocument extends Document {
  name: string;
}
