import { newsApiClient } from '@/api/clients/apiClients.ts/apiClient'
import type { NewsSourceApi } from '@/types/news.type'
import { getSearchQuery } from '@/utils/news'

import { getProviderCategory } from '../mappers/categoryMapper'
import { mapNewsApiArticles } from '../mappers/newsMapper'

export const newsApi: NewsSourceApi = {
  source: 'newsapi',

  async search(params, signal) {
    const category = getProviderCategory('newsapi', params.category)
    const hasCategory = Boolean(category)
    const response = await newsApiClient.get<{
      status: string
      totalResults: number
      articles: unknown[]
    }>({
      url: hasCategory ? '/top-headlines' : '/everything',
      signal,
      params: hasCategory
        ? {
            q: getSearchQuery(params.query),
            category,
            page: params.page || 1,
            pageSize: params.source === 'all' ? 6 : 12,
            language: 'en',
            apiKey: import.meta.env.VITE_NEWS_API_KEY,
          }
        : {
            q: getSearchQuery(params.query),
            from: params.fromDate,
            to: params.toDate,
            page: params.page || 1,
            pageSize: params.source === 'all' ? 6 : 12,
            language: 'en',
            sortBy: 'publishedAt',
            apiKey: import.meta.env.VITE_NEWS_API_KEY,
          },
    })

    return mapNewsApiArticles(
      response.data.articles ?? [],
      hasCategory ? params.category : undefined,
    )
  },
}
