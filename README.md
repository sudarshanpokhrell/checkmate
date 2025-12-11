# Checkmate

Learning socket.io by building a minimal real-time chess app. The project has a TypeScript/Express + socket.io backend that manages games and moves, and a React + Vite + Tailwind (v4) frontend for creating or joining rooms.

## Stack

- Backend: Node, Express, socket.io, chess.js, TypeScript, nodemon
- Frontend: React 19, Vite, React Router, Tailwind CSS v4 (@tailwindcss/vite)

## Repo layout

```
backend/   # socket.io server, game/room management
frontend/  # React UI (room creation/join flow, placeholder game page)
```

## Quick start

Prereqs: Node 18+ and npm.

### Backend

```
cd backend
npm install
npm run dev   # nodemon, listens on http://localhost:3000
```

### Frontend

```
cd frontend
npm install
npm run dev   # Vite dev server (default http://localhost:5173)
```

