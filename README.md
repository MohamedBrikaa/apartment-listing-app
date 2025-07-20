
# 🏘️ Apartment Listing App

A full-stack monorepo for an apartment listing platform, built with:

- **Backend**: [NestJS](https://nestjs.com/) + PostgreSQL
- **Frontend**: [Next.js](https://nextjs.org/) + Tailwind CSS
- **Infrastructure**: Docker & Docker Compose

---

## 📁 Project Structure

```
apartment-listing-app/
├── backend/                  # NestJS backend
│   ├── src/
│   ├── .env                  # Environment variables for backend
│   └── Dockerfile
├── frontend/                 # Next.js frontend
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── .env.local            # Environment variables for frontend
│   └── Dockerfile
├── docker-compose.yml        # Defines services: frontend, backend, db
└── README.md                 # You’re here
```

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- (Optional) [Node.js](https://nodejs.org/) if you want to run frontend/backend individually

---

### 1. 📦 Clone & Setup

```bash
git clone https://github.com/MohamedBrikaa/apartment-listing-app.git
cd apartment-listing-app
```

---

### 2. ⚙️ Environment Variables

Create and configure the following:

#### `backend/.env`

```env
NODE_ENV=dev
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=apartments
APP_HOST_URL=http://localhost:4000
```

#### `frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
INTERNAL_API_URL=http://localhost:4000
```

---

### 3. 🐳 Run with Docker Compose

```bash
docker-compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:4000/api](http://localhost:4000/api)
- PostgreSQL: `localhost:5432`

---

## 🧪 Running Without Docker

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🗃️ API Documentation

Once backend is running, access Swagger UI at:

```
http://localhost:4000/api/docs
```

---

## 📸 Uploads and Static Files

Uploaded apartment images are stored locally (or in cloud in production).

Ensure volume mounting is handled in `docker-compose.yml`.

---

## ✅ Features

- Create & browse apartment listings
- Image upload via Multer

---

## 🛠️ Tech Stack

| Layer       | Tech                          |
|------------|-------------------------------|
| Frontend    | Next.js, Tailwind CSS         |
| Backend     | NestJS, TypeORM, PostgreSQL   |
| DevOps      | Docker, Docker Compose        |

---

## 🧼 Code Quality

- ✅ DTO validation
- ✅ Global response interceptor
- ✅ Error handling
- ✅ Organized services and modules
- ✅ Swagger Docs (`/api/docs`)


---

## 👤 Author

Mohamed Suliman  
Senior Full Stack Developer  
[LinkedIn](https://www.linkedin.com/in/mohamed-brikaa/) | [GitHub](https://github.com/MohamedBrikaa)

---

## 📄 License

This project is licensed under the MIT License.
