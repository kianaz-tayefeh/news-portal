import { nyTimesClient } from '@/api/clients/apiClients.ts/apiClient'
import type { NewsSourceApi } from '@/types/news.type'
import { getPageSize } from '@/utils/common'
import { getSearchQuery } from '@/utils/news'

import { getProviderCategory } from '../mappers/categoryMapper'
import { mapNyTimesArticles, type NyTimesArticle } from '../mappers/nyTimesMapper'

type NyTimesResponse = {
  response: {
    docs: NyTimesArticle[] | null
  }
}

const formatDate = (date?: string) => date?.replaceAll('-', '')

const buildNyTimesFilterQuery = (category?: string) => {
  if (!category) return undefined

  return `section_name:("${category}") OR news_desk:("${category}")`
}

export const nytimesApi: NewsSourceApi = {
  source: 'nytimes',

  async search(params, signal) {
    const category = getProviderCategory('nytimes', params.category)

    const response = await nyTimesClient.get<NyTimesResponse>({
      url: '/articlesearch.json',
      signal,
      params: {
        q: getSearchQuery(params.query),
        fq: buildNyTimesFilterQuery(category),
        begin_date: formatDate(params.fromDate),
        end_date: formatDate(params.toDate),
        page: params.page ? params.page - 1 : 0,
        'api-key': import.meta.env.VITE_NYT_API_KEY,
      },
    })

    return mapNyTimesArticles(response.data.response.docs ?? []).slice(
      0,
      getPageSize(params.source),
    )
  },
}
