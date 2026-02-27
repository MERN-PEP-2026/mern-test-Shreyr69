[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ZroWLq75)

# Student Course Management System

A full-stack MERN application for managing student courses.

## Tech Stack

- **MongoDB** – Database
- **Express.js** – Backend framework
- **React (Vite)** – Frontend
- **Node.js** – Runtime

## Features

- Student registration & login (JWT auth)
- Create, view, and delete courses
- Search courses (Advanced Feature)

## Project Structure

```
mern-test-Shreyr69/
├── backend/
│   ├── config/         # DB connection
│   ├── middleware/     # Auth middleware
│   ├── models/         # Mongoose models (Student, Course)
│   ├── routes/         # Express routes (auth, courses)
│   └── server.js       # Entry point
└── frontend/
    └── src/
        ├── pages/      # Register, Login, Dashboard
        ├── components/ # Reusable UI components
        └── context/    # Auth context
```

## Getting Started

### Backend

```bash
cd backend
npm install
# create .env with MONGO_URI and JWT_SECRET
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Method | Route              | Description      |
| ------ | ------------------ | ---------------- |
| POST   | /api/auth/register | Register student |
| POST   | /api/auth/login    | Login student    |
| POST   | /api/courses       | Create course    |
| GET    | /api/courses       | Get all courses  |
| DELETE | /api/courses/:id   | Delete course    |
