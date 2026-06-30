# News Portal

A responsive news aggregator built with **React**, **TypeScript**, **Vite**, and **TanStack Query**. The application fetches and combines articles from multiple news providers into a single, consistent user experience.

## Features

- 🔍 Search articles by keyword
- 📅 Filter by date range
- 📰 Filter by category
- 🌍 Filter by news source
- 🔄 Aggregate articles from multiple providers
- 📱 Responsive design
- ⚡ URL-based search state
- 🚀 Client-side caching with TanStack Query
- ⏳ Debounced search
- 📄 Pagination

---

## Running the project

```bash
pnpm install
cp .env.example .env
pnpm run dev
```

## News Providers

The application integrates with:

- The Guardian
- New York Times
- NewsAPI

Each provider has its own mapper that transforms API-specific responses into a shared `Article` model.

---

## Tech Stack

- React
- TypeScript
- Vite
- TanStack Query
- TanStack Router
- Axios
- Zod
- Tailwind CSS

---

## Architecture

The project follows a provider-based architecture.

```
src/
 ├── api/
 ├── components/
 ├── hooks/
 ├── routes/
 ├── schema/
 ├── services/
 │    └── news/
 │         ├── providers/
 │         ├── mappers/
 │         └── newsService.ts
 ├── types/
 └── utils/
```

Each news provider is responsible for:

- calling its API
- mapping its response
- exposing a common interface

The service layer aggregates all providers and normalizes articles before returning them to the UI.

---

## State Management

The application uses **TanStack Query** for:

- data fetching
- caching
- request deduplication
- loading & error states
- keeping previous data during pagination

Search filters are stored in the **URL** using **TanStack Router**, allowing:

- page refresh without losing state
- bookmarkable URLs
- shareable searches
- browser back/forward navigation

Example:

```
/news?query=react&page=2&source=guardian&category=technology
```

---

## Search

Search requests are debounced to reduce unnecessary API calls while typing.

---

## Pagination

Pagination is performed at the API level.

Different providers expose different pagination capabilities, while the UI presents a consistent experience.

---

## Error Handling

The application uses `Promise.allSettled()` when querying multiple providers.

If one provider fails, articles from the remaining providers are still displayed.

Only when every provider fails is an error shown to the user.

---

## API Limitations

News providers expose different capabilities.

For example:

- NewsAPI does not support combining **category** and **date range** filters in the same endpoint.
- When using NewsAPI category filtering, date filters are disabled in the UI.

---

## Performance

Implemented optimizations include:

- TanStack Query caching
- Lazy-loaded images
- Debounced search
- URL-driven state
- Shared article model
- Provider-specific mappers
- Reusable API clients

---

### Configure environment variables

Create a `.env` file:

```env
VITE_GUARDIAN_API_KEY=YOUR_KEY
VITE_NYT_API_KEY=YOUR_KEY
VITE_NEWS_API_KEY=YOUR_KEY
```

### Start development server

```bash
pnpm run dev
```

---

## Docker

Build the image:

```bash
docker build -t news-portal .
```

Run the container:

```bash
docker run -p 5173:5173 news-portal
```

## Test

````bash
pnpm run test
pnpm run lint
pnpm run format
```bash
````
