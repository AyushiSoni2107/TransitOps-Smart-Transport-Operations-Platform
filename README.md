# TransitOps MERN Stack

This project is organized as a MERN stack app:

- `frontend/` - React + Vite + TypeScript client
- `backend/` - Node.js + Express + MongoDB API

## Setup

Install frontend dependencies:

```bash
cd frontend
npm install
npm run dev
```

Install backend dependencies in a second terminal:

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies `/api` requests to the backend on `http://localhost:5000`.
