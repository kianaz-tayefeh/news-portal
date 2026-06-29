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

export async function getNews(params: NewsSearchParams, signal?: AbortSignal): Promise<Article[]> {
  const enabledProviders = getEnabledProviders(params)

  const results = await Promise.allSettled(
    enabledProviders.map(async provider => {
      if (signal?.aborted) {
        throw new DOMException('Request aborted', 'AbortError')
      }

      return {
        source: provider.source,
        articles: await provider.search(params, signal),
      }
    }),
  )

  if (signal?.aborted) {
    throw new DOMException('Request aborted', 'AbortError')
  }

  const successfulArticles = results.flatMap(result =>
    result.status === 'fulfilled' ? result.value.articles : [],
  )

  const failedResults = results.filter(
    (result): result is PromiseRejectedResult => result.status === 'rejected',
  )

  const realFailedResults = failedResults.filter(result => {
    return getErrorMessage(result.reason) !== 'canceled'
  })

  if (!successfulArticles.length && realFailedResults.length) {
    throw new Error(
      realFailedResults.map(result => getErrorMessage(result.reason)).join(', ') ||
        'Failed to fetch news articles',
    )
  }

  return normalizeArticles(successfulArticles)
}
