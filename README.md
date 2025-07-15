# 📝 Task Manager API

A secure, scalable Task Management RESTful API built with **Node.js**, **Express**, **TypeScript**, **MySQL**, and **JWT Authentication**. This system supports task creation, update, soft deletion, and auto-completion tracking.

---

## 🚀 Features

- 🔐 JWT-based Authentication (`/auth/login`)
- 📄 Full CRUD operations for Tasks
- 🧠 Soft delete functionality (keeps tasks but hides from listing)
- 📅 Automatically tracks `completed_at` timestamp
- 📦 Built with scalable folder structure using services/controllers/routes
- ⚙️ Environment-based config using `.env`
- ✅ Fully typed with TypeScript

---

## 📁 Folder Structure
```
task-manager-api/
├── src/
│ ├── controllers/ # Request handlers
│ ├── middlewares/ # JWT auth middleware
│ ├── models/ # TypeScript interfaces
│ ├── routes/ # Express route definitions
│ ├── services/ # Business logic
│ ├── utils/ # DB connection
│ ├── app.ts # Express app config
│ └── index.ts # Entry point
├── .env # Environment variables
├── package.json
├── tsconfig.json
```
---

## ⚙️ Setup & Installation

### 📦 Prerequisites

- Node.js (v18+ recommended)
- MySQL
- Postman (for testing)

---

### 🧪 Step-by-Step

1. **Clone the repository**

git clone repo-url
cd task-manager-api

2. **Install dependencies**

npm install

3. **Configure environment**

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=taskmanager
JWT_SECRET=123456

4. **Start the MySQL server and create the tasks table:**

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  status ENUM('pending', 'in_progress', 'completed', 'deleted') DEFAULT 'pending',
  completed_at DATETIME NULL
);

5. **Run the development server**

npx ts-node-dev src/index.ts


## 🔐 Authentication
Dummy Credentials

{
  "username": "admin",
  "password": "admin123"
}

### 📘 API Endpoints

## 🔐 Auth
```
Method	    Endpoint	        Description

POST      	/auth/login     	Login and receive a JWT token
GET	        /tasks	          Get all tasks (excluding soft-deleted ones) with pagination
GET	        /tasks/:id	      Fetch a specific task by ID
POST	      /tasks          	Create a new task with title, description, and status
PATCH	      /tasks/:id      	Update a task (auto-sets completed_at when status = completed)
DELETE	    /tasks/:id	      Soft delete a task (sets status = deleted)
```
### 📥 Sample Task Payload

{
  "title": "Submit assignment",
  "description": "Upload the PDF to portal",
  "status": "pending"
}
