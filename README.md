# React Heroes App

Hero catalog with search, pagination, summaries and locally stored favorites. Built with React, Vite and TanStack Query.

## Local development

Use Node.js 22.12+ and the committed npm lockfile.

```sh
npm ci
cp .env.template .env
npm run dev
```

Run the heroes backend separately. `VITE_API_URL` is its origin (default `http://localhost:3000`); the client adds `/api/heroes`. Open the Vite URL under `/react-heroes-app/`.

## Checks

`npm run build`, `npm run lint` and `npm test -- --run`. Tests use `.env.test` and Vitest/jsdom. `npm run preview` serves a completed build.

Routes live in `src/router/app.routes.tsx`; hero data access and screens live in `src/heroes`. GitHub Pages deployment runs on pushes to `main` and requires the repository variable `VITE_API_URL`.
