import { getNews } from '@/services/news/newsService'
import type { NewsSearchParams } from '@/types/news.type'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { newsQueryKeys } from './newsQueryKeys'

export function useSearchArticles(params: NewsSearchParams) {
  return useQuery({
    queryKey: newsQueryKeys.search(params),
    queryFn: ({ signal }) => getNews(params, signal),
    enabled: true,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}
