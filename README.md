# Buylist App v1.0

![ExampleImageInWhiteMode](https://github.com/Linezinnn/buylist-app/assets/111308710/ee285145-8e4d-4a8d-b97a-1166f0248e60)

The purpose of the application is to manage a buy list and document them in the future

## Technologies ✔️

**API** - 
[NodeJS](https://nodejs.org/docs/latest-v20.x/api/index.html), 
[TypeScript](https://www.typescriptlang.org/docs/),
[Fastify](https://fastify.dev/docs/latest/Guides/Getting-Started/),
[Prisma](https://www.prisma.io/docs/getting-started/quickstart),
[Zod](https://zod.dev),
[Vitest](https://vitest.dev/guide/),

**Web** - 
[ReactJS](https://react.dev/learn),
[TypeScript](https://www.typescriptlang.org/docs/),
[React Hook Form](https://react-hook-form.com/get-started),
[React Query](https://tanstack.com/query/v4/docs/framework/react/quick-start),
[Axios](https://axios-http.com/docs/intro),
[Zod](https://zod.dev),
[TailwindCSS](https://tailwindcss.com/docs/installation),
[ShadcnUI](https://ui.shadcn.com/docs),

## General Updates ✔️
- Publish

## Getting Started in Local ✔️

To get started, you need to have NodeJS installed in LTS 20.11, witch you can download from the [**official website**](https://nodejs.org/en). 

### Configuring the API
Now, we will configure our API, starting with installing the dependencies.

Inside the folder **_./api_**, run the command: 

```bash
  npm install
```

Done this, we will configure the database. To do this, choose between [**MySQL**](https://dev.mysql.com/doc/), [**PostgreSQL**](https://www.postgresql.org/docs/), [**SQLite**](https://www.sqlite.org/docs.html), or [**SQLServer**](https://learn.microsoft.com/pt-br/sql/sql-server/?view=sql-server-ver16), and go to the Prisma configuration file.

Here, change the provider for your chosen database in lower case.

```ts
  datasource db {
    provider = "mysql" // "sqlite", "postgresql"...
    url = env("DATABASE_URL")
  }
```

Now, create a **_.env_** file inside **_./api_**, and add an environment variable to the file that contains the connection to your database:

```ts
  DATABASE_URL="provider://user:password@address:port/db_name"

// Example
  DATABASE_URL="mysql://steve:123@localhost:5432/my_database"
```

### Configuring the Frontend

To start using it, it's simple, just install the project's dependencies.

Go to the **_./web_** directory and run the code:

```js
  npm install
```

## Features ✔️
 - Register items to buy
 - Check items as bought
 - Create categories of items
 - Create categories of amounts

## Running the tests ✔️

The tests are present in the API, and will be executed to test the use cases, controlerrs, and data schemas using **Vitest**.

To run all tests, run in the terminal:

```
  npm run tests
```

## Author ✔️

🔨 Made with a lot of headache and resistance by **_Vinícius da Silva - linezinnn_**

