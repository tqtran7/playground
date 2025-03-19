## Instructions

Install dependencies:

```bash
npm install
```

Start server:

```bash
npm run dev
```

Go to `localhost:3000` to verify that the server is running.



This project demonstrates how to setup a simple API for the todo application. The database is already configured and setup remotely. You just need to install the dependencies and start the server.

NOTE: This application was tested on `node v23.3.0`

## Database Instructions

Install dependencies:

```bash
npm install
```

Start server:

```bash
npx prisma generate
npm run dev
```

Go to `localhost:3000/ping` to verify that the server is running.
Go to `localhost:3000/keystore` to preview the keystore page.

## Env file

Create a `.env` file and paste and save the following snippet.
Under normal circumstances, the contents of this file will never be shared.

```
DATABASE_URL="mysql://<username>:<password>@<url>:28221/defaultdb"
```

## Database Configurations

If you need to update the schema, modify the `schema.primsa` file.
Then run the following command to update.

```bash
npx prisma migrate dev --name <migration_message>
```

If you want to start fresh.

```bash
npx prisma init
```

Paste the following into the schema file.

```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Task {
  id    Int    @id @default(autoincrement())
  color  String
  message String @db.Text
  completed Boolean @default(false)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @default(now())
}
```

```bash
npx prisma generate
npm run dev
```