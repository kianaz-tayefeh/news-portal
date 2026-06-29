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
    const category = getProviderCategory('newsapi', params.category)
    const hasCategory = Boolean(category)

    const baseParams = {
      q: getSearchQuery(params.query),
      page: params.page ?? 1,
      pageSize: getPageSize(params.source),
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
