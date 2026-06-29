import { guardianClient } from '@/api/clients/apiClients.ts/apiClient'
import type { NewsSourceApi } from '@/types/news.type'
import { getPageSize } from '@/utils/common'
import { getSearchQuery } from '@/utils/news'

import { getProviderCategory } from '../mappers/categoryMapper'
import { mapGuardianArticles, type GuardianArticle } from '../mappers/guardianMapper'

type GuardianResponse = {
  response: {
    results: GuardianArticle[]
  }
}

export const guardianApi: NewsSourceApi = {
  source: 'guardian',

  async search(params, signal) {
    const category = getProviderCategory('guardian', params.category)

    const response = await guardianClient.get<GuardianResponse>({
      url: '/search',
      signal,
      params: {
        q: getSearchQuery(params.query),
        'from-date': params.fromDate,
        'to-date': params.toDate,
        section: category,
        page: params.page ?? 1,
        'show-fields': 'thumbnail,trailText',
        'page-size': getPageSize(params.source),
        'api-key': import.meta.env.VITE_GUARDIAN_API_KEY,
      },
    })

    return mapGuardianArticles(response.data.response.results ?? [])
  },
}
