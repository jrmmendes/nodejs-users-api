NodeJS Users API
================

[![Maintainability](https://api.codeclimate.com/v1/badges/1d3a7446e289892282f1/maintainability)](https://codeclimate.com/github/jrmmendes/nodejs-users-api/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/1d3a7446e289892282f1/test_coverage)](https://codeclimate.com/github/jrmmendes/nodejs-users-api/test_coverage) [![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://nodejs-users-api.herokuapp.com/) [![Build Status](https://travis-ci.org/jrmmendes/nodejs-users-api.svg?branch=main)](https://travis-ci.org/jrmmendes/nodejs-users-api)

Essa é uma API NodeJS que utiliza TypeScript, Inversify e MongoDB para criação de usuários e geração de tokens para acesso a rotas protegidas.

---

# Setup
Após clonar esse repositório, instale todas as dependências utilizando algum gerenciador de pacotes para node. Recomenda-se o uso do `yarn`:
```
yarn install
```
Inicie a aplicação com os scripts`start:dev` ou `start`. Os testes podem ser executados com o script `test` e caso necessite gerar a cobertura de testes, utilize `test:cov`. 

## Variáveis de Ambiente
No arquivo `.env`, dentro da raiz do projeto, é necessário inserir algumas constantes para o funcionamento da aplicação.

- `APP_SECRET`: string qualquer, utilizada para criptografia/geração de hashs.
- `DATABASE_URL`: uma string de conexão do `mongodb`. Caso esteja rodando o db pelo docker, o valor `mongodb://root:toor@localhost:27017/node-api-db?authSource=admin` pode ser utilizado.
- `PORT`(opcional): define a porta que será reservada para a aplicação (o valor padrão é 3000).

> Em produção, essas constantes devem ser inseridas diretamente no host.

## Banco de Dados
Caso deseje subir uma instância do mongodb rapidamente, é possível utilizar o Docker Compose, juntamente com o arquivo de configuração disponibilizado neste projeto - `db.compose.yml`. Para isso, execute:
```
docker-compose -f db.compose.yml up mongo -d
```
Na pasta raiz do projeto.

> Uma alternativa é utilizar o MongoDB Atlas.
---

# Licença
> Você pode ler a licença completa [aqui](https://github.com/jrmmendes/nodejs-users-api/LICENSE.md)

Esse projeto é licenciado nos termos da licença **MIT**
