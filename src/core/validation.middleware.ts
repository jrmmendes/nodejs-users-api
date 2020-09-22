import { RequestHandler } from 'express';
import { Schema } from 'joi';

export const validationMiddleware = (schema: Schema): RequestHandler => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      return res.status(400).send({
        mensagem: 'Erro na validação', erros: error?.details.map(e => e.message),
      });
    }
    return next();
  }
}
