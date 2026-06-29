import type { Article, NewsProvider, NewsSearchParams, NewsSourceApi } from '@/types/news.type'
import { normalizeArticles } from '@/utils/news'

import { guardianApi } from './providers/guardianApi'
import { newsApi } from './providers/newsApi'
import { nytimesApi } from './providers/nytimesApi'

const providers: Record<NewsProvider, NewsSourceApi> = {
  guardian: guardianApi,
  nytimes: nytimesApi,
  newsapi: newsApi,
}
const getEnabledProviders = (params: NewsSearchParams): NewsSourceApi[] => {
  if (!params.source) {
    return [guardianApi]
  }

  if (params.source === 'all') {
    return Object.values(providers)
  }

  return [providers[params.source]]
}

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }

  return 'Unknown error'
}

export const getNews = async (
  params: NewsSearchParams,
  signal?: AbortSignal,
): Promise<Article[]> => {
  const providers = getEnabledProviders(params)

  const results = await Promise.allSettled(
    providers.map(async provider => ({
      source: provider.source,
      articles: await provider.search(params, signal),
    })),
  )

  if (signal?.aborted) {
    throw new DOMException('Request aborted', 'AbortError')
  }

  const articles = results.flatMap(result =>
    result.status === 'fulfilled' ? result.value.articles : [],
  )

  const errors = results.filter(
    (result): result is PromiseRejectedResult => result.status === 'rejected',
  )

  errors.forEach(error => {
    console.error('[News provider failed]', error.reason)
  })

  if (!articles.length && errors.length) {
    throw new Error(
      errors.map(error => getErrorMessage(error.reason)).join(', ') ||
        'Failed to fetch news articles',
    )
  }

  return normalizeArticles(articles)
}
