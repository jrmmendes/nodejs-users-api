import { array, object, string } from "joi";

export const signUpData = object({
  nome: string().required(),
  email: string().email().required(),
  senha: string().required(),
  telefones: array().items(object({
    numero: string().length(9).required(),
    ddd: string().length(2).required(),
  })),
});

export const signInCredentials = object({
  email: string().email().required(),
  senha: string().required(),
});
