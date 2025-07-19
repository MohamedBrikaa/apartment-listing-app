# Apartment Listing Backend

This is the backend service for the Apartment Listing App built using NestJS, TypeORM, PostgreSQL, and Swagger.

## 📦 Tech Stack

- [NestJS](https://nestjs.com/) - Node.js framework
- [TypeORM](https://typeorm.io/) - ORM for TypeScript and JavaScript
- [PostgreSQL](https://www.postgresql.org/) - Relational Database
- [Swagger](https://swagger.io/) - API Documentation
- [Docker](https://www.docker.com/) - Containerization
- [Docker Compose](https://docs.docker.com/compose/) - Multi-container orchestration

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose installed

### Setup

1. Clone the repository:

```bash
git clone <your-repo-url>
cd apartment-backend
```

2. Create a `.env` file:

```env
NODE_ENV=local
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=apartment_db
```

3. Install dependencies:

```bash
npm install
```

4. Run the application using Docker:

```bash
docker-compose up --build
```

5. Access the API at:

```
http://localhost:4000
```

## 📚 API Documentation with Swagger

### Installation

Swagger is integrated using `@nestjs/swagger`. If you’re working locally outside Docker, install dependencies manually:

```bash
npm install --save @nestjs/swagger swagger-ui-express
```

### Accessing Docs

Once the backend is running, visit:

```
http://localhost:4000/api
```

You will find the Swagger UI with full documentation for all endpoints, request/response schemas, and examples.

## 📂 Folder Structure

- `src/apartments` – Module for apartment APIs
- `src/entities` – TypeORM entity definitions
- `src/config` – Configuration files

## 🧪 Testing

> To be added later (unit & e2e tests)

## 📝 License

MIT