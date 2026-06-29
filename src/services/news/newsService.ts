import type { Article, NewsProvider, NewsSearchParams, NewsSourceApi } from '@/types/news.type'
import { getErrorMessage } from '@/utils/error'
import { normalizeArticles } from '@/utils/news'

import { guardianApi } from './providers/guardianApi'
import { newsApi } from './providers/newsApi'
import { nytimesApi } from './providers/nytimesApi'

const newsProviders: Record<NewsProvider, NewsSourceApi> = {
  guardian: guardianApi,
  nytimes: nytimesApi,
  newsapi: newsApi,
}

const defaultProvider = guardianApi

const isRejectedResult = <T>(result: PromiseSettledResult<T>): result is PromiseRejectedResult =>
  result.status === 'rejected'

const getEnabledProviders = (params: NewsSearchParams): NewsSourceApi[] => {
  if (!params.source) return [defaultProvider]
  if (params.source === 'all') return Object.values(newsProviders)

  return [newsProviders[params.source]]
}

export const getNews = async (
  params: NewsSearchParams,
  signal?: AbortSignal,
): Promise<Article[]> => {
  const enabledProviders = getEnabledProviders(params)

  const results = await Promise.allSettled(
    enabledProviders.map(async provider => ({
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

  const errors = results.filter(isRejectedResult)

  for (const error of errors) {
    console.error('[News provider failed]', error.reason)
  }

  if (!articles.length && errors.length) {
    throw new Error(errors.map(error => getErrorMessage(error.reason)).join(', '))
  }

  return normalizeArticles(articles)
}
