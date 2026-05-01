# FOREXNOVA

This repository contains a full-stack Forex investment demo with:

- `backend/` — Node.js + Express API with MongoDB, JWT auth, and transaction support
- `frontend/` — React + Vite web app with login, dashboard, and transactions

## Local development

### Backend

1. Open `backend/`
2. Copy `backend/.env.example` to `backend/.env`
3. Set `MONGO_URI` and `JWT_SECRET`
4. Install dependencies:
   - `npm install`
5. Start the API:
   - `npm start`

### Frontend

1. Open `frontend/`
2. Copy `frontend/.env.example` to `frontend/.env`
3. If running the backend locally, leave `VITE_API_URL=http://localhost:5000`
4. Install dependencies:
   - `npm install`
5. Start the app:
   - `npm run dev`

Open `http://localhost:5173`

## Deployment

- Deploy `backend/` as a Node.js service (Railway, Render, Fly.io, etc.)
- Deploy `frontend/` as a static site (Vercel, Netlify)
- Set `VITE_API_URL` in frontend production environment to the backend URL

## Notes

- Use `backend/` as the live API service
- Ignore legacy root-level `server.js` and `package.json` if present
