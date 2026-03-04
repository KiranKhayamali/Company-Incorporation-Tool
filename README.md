# Company Incorporation Tool

A full-stack Company Incorporation Tool built with modern best practices, featuring a multi-step form, SQL database persistence, Dockerized backend, and clean architecture.

This project was developed as part of a Full Stack Technical Assessment to demonstrate backend API design, relational database modeling, and interactive frontend implementation.


---

## 🚀 Features

### ✅ Multi-Step Company Registration
- Step 1: Company Information
- Step 2: Dynamic Shareholder Information
- Draft persistence (refresh-safe workflow)
- Resume incomplete company registration

### ✅ Backend API
- Create company record
- Save shareholder records linked to a company
- Retrieve all companies
- Retrieve a company with its shareholders

### ✅ Admin View
- View all registered companies
- Display shareholders per company

### ✅ Technical Highlights
- PostgreSQL (SQL database with proper relations)
- Prisma ORM
- TypeScript (frontend & backend)
- React + React Hook Form
- Zod validation
- Dockerized backend
- Docker Compose setup
- Clean project structure

---

# 🧱 Tech Stack

## Frontend
- React
- TypeScript
- React Router
- React Hook Form
- Zod
- Axios

## Backend
- Node.js
- Express
- TypeScript
- Prisma ORM

## Database
- PostgreSQL

## DevOps
- Docker
- Docker Compose

---

# 🗂️ Project Structure

```
company-incorporation-tool/
│
├── frontend/              # React frontend
│   ├── pages/
│   ├── components/
│   ├── services/
│   └── types/
│
├── backend/              # Express backend
│   ├── prisma/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
└── compose.yml
```

---

# 🧠 Architecture Overview

## Database Schema

### Company
- id (UUID)
- name
- numberOfShareholders
- totalCapital
- createdAt

### Shareholder
- id (UUID)
- firstName
- lastName
- nationality
- companyId (Foreign Key → Company.id)

### Relationship
One Company → Many Shareholders (1:N relationship)

This ensures proper relational integrity and normalized database design.

---

# 🔌 API Endpoints

### Create Company
```
POST /companies
```

### Save Shareholders
```
POST /companies/:id/shareholders
```

### Get All Companies
```
GET /companies
```

### Get Single Company
```
GET /companies/:id
```

Each company response includes its related shareholders.

---

# 📝 Draft Persistence Strategy

After completing Step 1:

- The company record is saved in the database.
- The company ID is stored in localStorage.
- On browser refresh:
  - The frontend fetches company data from the backend.
  - The form is automatically pre-filled.
- Users can resume registration later without losing progress.

This ensures a robust and user-friendly workflow.

---

# 🐳 Running with Docker (Recommended)

## Prerequisites
- Docker
- Docker Compose

## Run the Application

From the project root directory:

```bash
docker compose up --build
```

This starts:

- PostgreSQL database container
- Backend API container

Backend runs on:

```
http://localhost:5000
```

---

# 💻 Running Without Docker

## 1️⃣ Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/company_db"
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start backend:

```bash
npm run dev
```

---

## 2️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🎯 Key Implementation Decisions

## Why PostgreSQL?
- Strong relational integrity
- Foreign key constraints
- Production-grade SQL database

## Why Prisma?
- Type-safe ORM
- Clean schema modeling
- Automatic client generation

## Why Multi-Step Form?
- Improved user experience
- Logical separation of data collection
- Cleaner frontend architecture

## Why Docker?
- Environment consistency
- Simplified setup for reviewers
- Production-ready workflow

---

# 🏆 Bonus Implementations

- Dockerized backend
- Docker Compose setup
- PostgreSQL integration
- Type-safe backend and frontend
- Zod validation
- Clean folder architecture
- Dynamic form rendering
- Proper relational database design

---

# 🔍 Evaluation Criteria Covered

✔ Functionality  
✔ Database design  
✔ API design  
✔ Frontend implementation  
✔ Code quality  
✔ Structure and organization  
✔ Draft persistence  
✔ SQL relationships  
✔ Clean architecture  

---

# 📌 Future Improvements

- Authentication for admin access
- Pagination for admin dashboard
- Enhanced UI styling
- CI/CD pipeline integration

---

# 👨‍💻 Author

Kiran Khayamali  
Full Stack Developer

---

## 📄 License

This project was developed for technical assessment purposes.