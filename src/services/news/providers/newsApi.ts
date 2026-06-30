import { newsApiClient } from '@/api/clients/apiClients.ts/apiClient'
import type { NewsSourceApi } from '@/types/news.type'
import { getPageSize } from '@/utils/common'
import { getSearchQuery } from '@/utils/news'

import { getProviderCategory } from '../mappers/categoryMapper'
import { mapNewsApiArticles, type NewsApiArticle } from '../mappers/newsMapper'

type NewsApiResponse = {
  articles: NewsApiArticle[]
}

export const newsApi: NewsSourceApi = {
  source: 'newsapi',

  async search(params, signal) {
    const requestedCategory = params.category
    const category = getProviderCategory('newsapi', requestedCategory)
    const hasCategory = Boolean(category)
    const hasDateRange = Boolean(params.fromDate || params.toDate)

    if (requestedCategory && !category) {
      throw new Error(`NewsAPI does not support the "${requestedCategory}" category`)
    }

    if (hasCategory && hasDateRange) {
      throw new Error('NewsAPI does not support category searches with date filters')
    }

    const baseParams = {
      q: hasCategory ? params.query.trim() || undefined : getSearchQuery(params.query),
      page: params.page ?? 1,
      pageSize: getPageSize(),
      language: 'en',
      apiKey: import.meta.env.VITE_NEWS_API_KEY,
    }

    const response = await newsApiClient.get<NewsApiResponse>({
      url: hasCategory ? '/top-headlines' : '/everything',
      signal,
      params: hasCategory
        ? {
            ...baseParams,
            category,
          }
        : {
            ...baseParams,
            from: params.fromDate,
            to: params.toDate,
            sortBy: 'publishedAt',
          },
    })

    return mapNewsApiArticles(
      response.data.articles ?? [],
      hasCategory ? params.category : undefined,
    )
  },
}
