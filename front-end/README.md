# Frontend - O Boticário

Este projeto foi desenvolvido utilizando React com Chakra UI. Consta uma funcionalidade de busca automática de CEP utilizando a API ViaCEP e possui login e senha com autenticação via banco.

## Tecnologias Utilizadas

- **React**
- **Chakra UI** 
- **ViaCEP**
- **Axios**
- **React Router**
- **React Hook**

## Funcionalidades

- **Autenticação**: Sistema de login e senha.
- **Upload de Arquivos**: Utilizando o componente Dragger do Ant Design.
- **Busca de CEP**: Consulta automática de endereço a partir do CEP utilizando a API ViaCEP.
- **Interface Moderna**: Construída com Chakra UI para uma experiência de usuário agradável.

## Pré-requisitos

- Node.js e npm instalado

## Como Rodar o Projeto

1. **Clonar o Repositório**

```bash
git clone https://github.com/vctormarques/o-boticario-test.git
cd o-boticario-test
```
Copie o arquivo .env.example e renomeie para .env:
```
cp .env.example .env
```
Edite o arquivo .env e insira a URL do seu backend e a porta que vai rodar o sistema:

```
REACT_APP_BACKEND_URL=http://localhost:2000/
PORT=3000
```
Instale as dependências

```
npm install
```
Inicialize o projeto

```
npm start
```
