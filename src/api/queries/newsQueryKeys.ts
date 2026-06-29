import type { NewsSearchParams } from '@/types/news.type'

export const newsQueryKeys = {
  search: (params: NewsSearchParams) => [
    'news',
    'search',
    params.query ?? '',
    params.source ?? 'guardian',
    params.category ?? '',
    params.fromDate ?? '',
    params.toDate ?? '',
    params.page ?? 1,
  ],
}
