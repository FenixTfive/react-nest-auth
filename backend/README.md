# 🧠 Backend – Basic Login API (NestJS + Prisma + PostgreSQL)

This is the backend service for the **Basic Login React + NestJS** template. It provides a modular, production-ready API with user registration, login, and JWT-based authentication. It uses **NestJS**, **Prisma**, **PostgreSQL**, and **Swagger** for documentation.

## 🧱 Tech Stack

- 🚀 **NestJS** – Progressive Node.js framework
- 🔧 **Prisma ORM** – Type-safe, auto-generated DB client
- 🛢️ **PostgreSQL** – Relational database
- 📄 **Swagger / OpenAPI** – API documentation via `@nestjs/swagger`
- 🔐 **JWT** – Secure token-based authentication
- 🟦 **TypeScript**

## 🚀 Getting Started

### 1. Clone the repository

git clone https://github.com/your-username/basic-login-api.git

cd basic-login-api

### 2. Install dependencies

npm install

### 3. Environment variables

Create a .env file in the root with the following:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/YOUR_DB_NAME?schema=public"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN="1d"
Replace USER, PASSWORD, and YOUR_DB_NAME with your local PostgreSQL credentials.

### 🛠 Database Setup with Prisma

Generate the Prisma client:
npx prisma generate

Apply migrations:
npx prisma migrate dev

Open Prisma Studio:
npx prisma studio

### npx prisma studio

🔧 Running the App

Development:
npm run start:dev

Production:
npm run build
npm run start:prod

### 📄 API Documentation (Swagger)

Once the server is running, you can access auto-generated Swagger UI at:
http://localhost:3000/api
Swagger is set up using @nestjs/swagger and decorators like @ApiTags(), @ApiProperty(), and @ApiBearerAuth().

### 🧪 Useful Commands

npm run start:dev # Run the server in dev mode
npm run build # Build the app for production
npm run start:prod # Run compiled app
npx prisma generate # Generate the Prisma client
npx prisma migrate dev # Apply DB migrations
npx prisma studio # Visual DB browser

### ✅ Features

🧾 User registration and login

🔒 JWT-based authentication

🧬 Input validation with DTOs and class-validator

📄 Swagger API documentation

🔧 Prisma ORM for DB queries

🐘 PostgreSQL integration

💡 Modular, scalable architecture

```

```
