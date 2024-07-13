# API de usuários - backend

Este projeto faz parte do trabalho da disciplina de Qualidade de Software para a Web do curso de pós-graduação em Desenvolvimento Web FullStack da PUC Minas. É um projeto Node.js focado em testes utilizando Jest e SuperTest.

## API

A API disponibiliza os seguintes endpoints para gerenciar usuários:

- **GET /users**: Retorna todos os usuários cadastrados.
- **POST /users**: Cria um novo usuário. O corpo da requisição deve incluir os seguintes atributos: `name`, `email` e `password`.
- **PUT /users/:id**: Atualiza um usuário existente com o ID especificado. O corpo da requisição deve conter os novos dados do usuário a serem atualizados.
- **DELETE /users/:id**: Remove o usuário com o ID especificado.
- **DELETE /users**: Remove todos os usuários.

## Testes

O projeto inclui dois conjuntos principais de testes:

- **user-repository.spec.js**: Testes unitários para o repositório de usuários.
- **app.spec.js**: Testes de integração para a aplicação web.

## Executando o Projeto

Para executar a API, siga os passos abaixo:

1. Instale as dependências com o comando:

```
npm install
```

2. Inicie o servidor com o comando:

```
node index.js
```

A API estará disponível na porta 3000.

## Executando Testes

Para executar os testes automatizados, utilize o seguinte comando:

```
npm run test
```

Isso iniciará a execução dos testes utilizando Jest e SuperTest.
