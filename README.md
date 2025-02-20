# Task Management Application

## Overview

A full-stack Task Management application with authentication and task CRUD functionality.

- **Frontend**: React + TypeScript
- **Backend**: Node.js + PostgreSQL
- **Authentication**: JWT for user sessions

---

## Project Structure

```
/root
│
├── backend
│   ├── index.js
│   ├── package.json
│   ├── .env
│   └── ...
│
├── frontend
│   ├── src
│   ├── package.json
│   ├── .env
│   └── ...
├── README.md
```

---

## Backend Setup

### Environment Variables (Backend)

Create a `.env` file in the `backend` directory with the following:

```
PORT=8000

DB_USER="your db user"
DB_HOST=localhost
DB_NAME="your db name"
DB_PASSWORD="your db pw"
DB_PORT=5432


JWT_SECRET=abf8028dd5862cca9a462f901f4e09a60ac5344212cc8cc8db602af64ab96042
```

**Note:** Replace credentials as needed!

### Install Dependencies

```bash
cd backend
npm install
```

### Run Migrations

```bash
npx npm install
```

### Start the Server

```bash
node index.js
```

The server should be running on `http://localhost:8000`.

---

## Frontend Setup

### Environment Variables (Frontend)

Create a `.env` file in the `frontend` directory with the following:

```
VITE_BACKEND_URL=http://localhost:8000
```

**Note:** Ensure this URL matches your backend server.

### Install Dependencies

```bash
cd frontend
npm install
```

### Start the Frontend

```bash
npm run dev
```

The frontend should be running on `http://localhost:5173` (default Vite port).

---

## Demo Video

[Link to Demo Video](#)  

![JWT Flowchart](/github_assets/Screenshot%202025-02-20%20at%2012.16.57.png)


---

## Salary Expectations

$4000 USD ~ $5200 USD Monthly

---

## Submission

1. **Fork** this repository.
2. Implement the solution in your fork.
3. Create a pull request before the deadline: **Sunday, Feb 23th, 11:59 PM PST**.

---


