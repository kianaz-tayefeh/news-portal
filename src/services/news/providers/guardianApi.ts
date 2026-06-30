import { guardianClient } from '@/api/clients/apiClients.ts/apiClient'
import { SOURCES_NAMES } from '@/constants/news.constants'
import { getProviderCategory } from '@/services/news/mappers/categoryMapper'
import { mapGuardianArticles, type GuardianArticle } from '@/services/news/mappers/guardianMapper'
import type { NewsSourceApi } from '@/types/news.type'
import { getPageSize } from '@/utils/common'

type GuardianResponse = {
  response?: {
    results?: GuardianArticle[]
  }
}

export const guardianApi: NewsSourceApi = {
  source: SOURCES_NAMES.gaurdian,

  async search(params, signal) {
    const category = getProviderCategory(SOURCES_NAMES.gaurdian, params.category)

    const response = await guardianClient.get<GuardianResponse>({
      url: '/search',
      signal,
      params: {
        q: params.query.trim() || undefined,
        'from-date': params.fromDate,
        'to-date': params.toDate,
        section: category,
        'order-by': 'newest',
        page: params.page ?? 1,
        'show-fields': 'thumbnail,trailText',
        'page-size': getPageSize(),
        'api-key': import.meta.env.VITE_GUARDIAN_API_KEY,
      },
    })

    return mapGuardianArticles(response.data.response?.results ?? [])
  },
}
