# News Portal

React + TypeScript news portal built with Vite.

## Tech Stack

- React
- TypeScript
- Vite
- ESLint
- Prettier
- Husky
- Docker

## Setup

```bash
pnpm install
pnpm run dev
```

docker build --no-cache -t news-portal .
docker run -p 3000:3000 --env-file .env news-portal
