# Deployment Guide

This repository contains two deployments:
- `backend/` — the Node/Express API with MongoDB and JWT auth.
- `frontend/` — the React/Vite web app.

> If you see extra legacy files such as a root-level `server.js` or `frontend/frontend/`, ignore them. The active project is in `backend/` and `frontend/`.

## 1. Publish the backend

Recommended hosts: Railway, Render, Fly.io, or any Node.js server.

- Push the repository to GitHub.
- Create a new Node service with the `backend` folder as the working directory.
- Set environment variables:
  - `MONGO_URI` — your MongoDB connection string
  - `JWT_SECRET` — a random secret for authentication
  - `PORT` — optional, defaults to `5000`
- Install dependencies with `npm install` and start with `npm start`.

## 2. Publish the frontend

Recommended hosts: Vercel or Netlify.

### Vercel

- Connect your GitHub repository.
- Set the project root to `frontend`.
- Set the build command to `npm run build`.
- Set the output directory to `dist`.
- Add an environment variable:
  - `VITE_API_URL` — the public URL of your backend, for example `https://your-backend.app`.

### Netlify

- Connect the repository and set the project root to `frontend`.
- Set the publish directory to `dist`.
- Set the build command to `npm run build`.
- Add `VITE_API_URL` in site settings.

### Frontend environment variable

The frontend already includes `frontend/.env.example` with:

```env
VITE_API_URL=http://localhost:5000
```

Replace it with your live backend URL in production.

## 3. Verify production behavior

- The frontend uses `VITE_API_URL` to call the backend.
- The backend exposes:
  - `GET /` for health checks
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/transactions/invest`
  - `GET /api/transactions` (protected route)

## 4. Local test

- Start the backend from `backend`:
  - `npm install`
  - `npm start`
- Start the frontend from `frontend`:
  - `npm install`
  - `npm run dev`

Open `http://localhost:5173` in your browser.

