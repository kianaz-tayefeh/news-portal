import { guardianClient } from '@/api/clients/apiClients.ts/apiClient'
import type { NewsSourceApi } from '@/types/news.type'
import { getSearchQuery } from '@/utils/news'

import { getProviderCategory } from '../mappers/categoryMapper'
import { mapGuardianArticles } from '../mappers/guardianMapper'

export const guardianApi: NewsSourceApi = {
  source: 'guardian',

  async search(params, signal) {
    const category = getProviderCategory('guardian', params.category)

    const response = await guardianClient.get<{
      response: {
        results: unknown[]
      }
    }>({
      url: '/search',
      signal,
      params: {
        q: getSearchQuery(params.query),
        'from-date': params.fromDate,
        'to-date': params.toDate,
        section: category,
        page: params.page || 1,
        'show-fields': 'thumbnail,trailText,byline',
        'api-key': import.meta.env.VITE_GUARDIAN_API_KEY,
        'page-size': params.source === 'all' ? 6 : 12,
      },
    })

    return mapGuardianArticles(response.data.response.results ?? [])
  },
}
