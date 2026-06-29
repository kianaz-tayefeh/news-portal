import { createApiClient } from './createAxiosClient'

export const guardianClient = createApiClient({
  baseUrl: import.meta.env.VITE_GUARDIAN_API_URL,
})

export const nyTimesClient = createApiClient({
  baseUrl: import.meta.env.VITE_NYT_API_URL,
})

export const newsApiClient = createApiClient({
  baseUrl: import.meta.env.VITE_NEWS_API_URL,
})
