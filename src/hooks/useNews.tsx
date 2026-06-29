import { useEffect, useState } from 'react'
import { useSearchArticles } from '@/api/queries/newsQueries'
import { Route } from '@/routes/news/index'
import type { NewsSearchParams } from '@/types/news.type'

import { useDebouncedValue } from './useDebounce'

const normalizeQuery = (value?: string) => {
  const query = value?.trim()
  return query || undefined
}

export function useNews() {
  const filters = Route.useSearch()
  const navigate = Route.useNavigate()

  const [searchInput, setSearchInput] = useState(filters.query ?? '')
  const debouncedSearch = useDebouncedValue(searchInput, 500)

  const queryParams = {
    ...filters,
    query: normalizeQuery(filters.query),
    page: filters.page ?? 1,
  }

  const articlesQuery = useSearchArticles(queryParams)

  const updateFilters = (nextFilters: Partial<NewsSearchParams>) => {
    const hasQueryUpdate = Object.prototype.hasOwnProperty.call(nextFilters, 'query')
    const hasPageUpdate = Object.prototype.hasOwnProperty.call(nextFilters, 'page')

    navigate({
      search: previous => ({
        ...previous,
        ...nextFilters,
        query: hasQueryUpdate ? normalizeQuery(nextFilters.query) : previous.query,
        page: hasPageUpdate ? nextFilters.page : 1,
      }),
      replace: true,
    })
  }

  useEffect(() => {
    const nextQuery = normalizeQuery(debouncedSearch)
    const currentQuery = normalizeQuery(filters.query)

    if (nextQuery === currentQuery) return

    updateFilters({ query: nextQuery })
  }, [debouncedSearch, filters.query])

  const nextPage = () => {
    updateFilters({
      page: (filters.page ?? 1) + 1,
    })
  }

  const previousPage = () => {
    updateFilters({
      page: Math.max(1, (filters.page ?? 1) - 1),
    })
  }

  return {
    filters: queryParams,
    searchInput,
    setSearchInput,
    articles: articlesQuery.data ?? [],
    isLoading: articlesQuery.isLoading,
    isFetching: articlesQuery.isFetching,
    isError: articlesQuery.isError,
    updateFilters,
    nextPage,
    previousPage,
  }
}
