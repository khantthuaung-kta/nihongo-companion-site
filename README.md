# Nihongo Companion

Nihongo Companion is a work-in-progress vocabulary companion for Burmese-speaking learners of Japanese. The goal is to make it easier to look up Japanese words, understand their meanings in Burmese, and review them later.

## Project status

This repository contains the React landing page, FastAPI health endpoints, and the initial PostgreSQL schema. Dictionary search, Burmese translations, and flashcard review are planned.

## Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Python, FastAPI, SQLAlchemy |
| Database | PostgreSQL, Alembic |

## Run the frontend

```bash
git clone https://github.com/khantthuaung-kta/nihongo-companion-site.git
cd nihongo-companion-site/frontend
npm install
npm run dev
```

Open http://localhost:5173. The landing page runs without a backend. The API and database code live in `backend/`.
