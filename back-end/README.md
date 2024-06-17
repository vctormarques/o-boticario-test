



# Backend - O Boticário

Este projeto foi desenvolvido utilizando Node com [NestJS](https://nestjs.com/). 

## Tecnologias Utilizadas

- **NestJs**
- **TypeORM** 
- **Swagger** 
- **NestJs-Pino**
- **JWT**
- **Multer**

## Funcionalidades

- **Autenticação**: Sistema de login e senha.
- **SWAGGER**: Todas rotas documentadas.
- **Upload de Arquivos**: Utilizando o malter para gerenciamento da imagem.

## Pré-requisitos

- Node.js e npm instalado

## Como Rodar o Projeto

1. **Clonar o Repositório**

```bash
git clone https://github.com/vctormarques/o-boticario-test.git
cd o-boticario-test/back-end
```
Copie o arquivo .env.example e renomeie para .env:
```
cp .env.example .env
```
Edite o arquivo .env e insira a URL do seu backend e a porta que vai rodar o sistema, exemplo abaixo:

```
API_ENV=development
PORT=2000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=test_bot
DB_USER=root
DB_PASS=

JWT_SECRET=oboticarioAPI
```
Instale as dependências

```
npm install
```
Inicialize o projeto

```
npm start
```

- O Swagger está disponivel no endpoint /docs

Comandos adicionais
```
npx typeorm migration:run
```


