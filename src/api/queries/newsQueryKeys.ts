import type { NewsSearchParams } from '@/types/news.type'

export const newsQueryKeys = {
  all: ['news'] as const,

  search: (params: NewsSearchParams) => [...newsQueryKeys.all, 'search', params] as const,
}
