# API de usuários - backend

Este projeto faz parte do trabalho da disciplina de Qualidade de Software para a Web do curso de pós-graduação em Desenvolvimento Web FullStack da PUC Minas. É um projeto Node.js focado em testes utilizando Jest e SuperTest.

## Endpoints

A API disponibiliza os seguintes endpoints para gerenciar usuários:

- **GET /users**: Retorna todos os usuários cadastrados.
- **POST /users**: Cria um novo usuário. O corpo da requisição deve incluir os seguintes atributos: `name`, `email` e `password`.
- **PUT /users/:id**: Atualiza um usuário existente com o ID especificado. O corpo da requisição deve conter os novos dados do usuário a serem atualizados.
- **DELETE /users/:id**: Remove o usuário com o ID especificado.
- **DELETE /users**: Remove todos os usuários.

## Arquivos de teste

O projeto inclui dois conjuntos principais de testes:

- **user-repository.spec.js**: Testes unitários para o repositório de usuários.
- **app.spec.js**: Testes de integração para a aplicação web.

## Banco de dados

O banco de dados utilizado para armazenamento dos usuários é o SQLite. Ele foi criado à partir da execução da migração `20240711235748_create-user-table.js` no diretório `/db/migrations`.

## Executando o projeto

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

## Executando os testes

Para executar os testes automatizados, utilize o seguinte comando:

```
npm run test
```

Isso iniciará a execução dos testes utilizando Jest e SuperTest.

## Considerações

Por conta do projeto ter o foco nos testes e não na API em si, não foi dado o devido tratamento à segurança da senha do usuário. Desta forma, o valor está sendo salvo sem qualquer criptografia.
