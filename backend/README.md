# StartupPilot backend

This folder contains a Node.js + Express backend scaffold using Prisma for PostgreSQL.

Quick start (local, recommended via Docker Compose)

1. Copy `.env.example` to `.env` and adjust values if needed.
2. From `backend/` directory run:

```bash
docker-compose up --build
```

This will start Postgres and the backend in dev mode (nodemon). After the DB is up, run migrations:

```bash
docker-compose exec backend npm run prisma:migrate
docker-compose exec backend npm run prisma:generate
```

Alternatively run locally without Docker:

1. Ensure Postgres is running and set `DATABASE_URL` in `.env`.
2. Install dependencies: `npm install`
3. Run migrations: `npx prisma migrate dev --name init`
4. Start server: `npm run dev`

API base path: `/api/v1`

Implemented resources: `startups`, `projects`, `tasks`, `users`.

Next recommended steps: seed initial users, add validation middleware, and wire the frontend `VITE_API_URL` env to point to `http://localhost:4000/api/v1`.
