import { nyTimesClient } from '@/api/clients/apiClients.ts/apiClient'
import { SOURCES_NAMES } from '@/constants/news.constants'
import { getProviderCategory } from '@/services/news/mappers/categoryMapper'
import { mapNyTimesArticles, type NyTimesArticle } from '@/services/news/mappers/nyTimesMapper'
import type { NewsSourceApi } from '@/types/news.type'
import { getPageSize } from '@/utils/common'

type NyTimesResponse = {
  response?: {
    docs?: NyTimesArticle[] | null
  }
}

const formatDate = (date?: string) => date?.replaceAll('-', '')

const buildNyTimesFilterQuery = (category?: string) => {
  if (!category) return undefined

  return `section_name:("${category}") OR news_desk:("${category}")`
}

export const nytimesApi: NewsSourceApi = {
  source: SOURCES_NAMES.nytimes,

  async search(params, signal) {
    const category = getProviderCategory(SOURCES_NAMES.nytimes, params.category)

    const response = await nyTimesClient.get<NyTimesResponse>({
      url: '/articlesearch.json',
      signal,
      params: {
        q: params.query.trim() || undefined,
        fq: buildNyTimesFilterQuery(category),
        begin_date: formatDate(params.fromDate),
        end_date: formatDate(params.toDate),
        page: params.page ? params.page - 1 : 0,
        sort: 'newest',
        'api-key': import.meta.env.VITE_NYT_API_KEY,
      },
    })

    return mapNyTimesArticles(response.data.response?.docs ?? []).slice(0, getPageSize())
  },
}
