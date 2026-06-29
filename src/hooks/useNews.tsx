import { useEffect, useMemo, useState } from 'react'
import { useSearchArticles } from '@/api/queries/newsQueries'
import { Route } from '@/routes/news/index'
import type { NewsSearchParams } from '@/types/news.type'

import { useDebouncedValue } from './useDebounce'

export const useNews = () => {
  const filters = Route.useSearch()
  const navigate = Route.useNavigate()

  const [searchInput, setSearchInput] = useState(filters.query)
  const debouncedSearch = useDebouncedValue(searchInput)

  const queryParams: NewsSearchParams = useMemo(
    () => ({
      ...filters,
      query: filters.query.trim(),
      page: filters.page ?? 1,
    }),
    [filters],
  )

  const articlesQuery = useSearchArticles(queryParams)
  const hasNextPage = articlesQuery.data?.length === 12

  const updateFilters = (nextFilters: Partial<NewsSearchParams>) => {
    const hasPageUpdate = nextFilters.page !== undefined

    navigate({
      search: previousFilters => ({
        ...previousFilters,
        ...nextFilters,
        query: (nextFilters.query ?? previousFilters.query).trim(),
        page: hasPageUpdate ? nextFilters.page : 1,
      }),
      replace: true,
    })
  }

  useEffect(() => {
    const nextQuery = debouncedSearch.trim()
    const currentQuery = filters.query.trim()

    if (nextQuery !== currentQuery) {
      updateFilters({ query: nextQuery })
    }
  }, [debouncedSearch, filters.query])

  const nextPage = () => {
    updateFilters({ page: queryParams.page + 1 })
  }

  const previousPage = () => {
    updateFilters({ page: Math.max(1, queryParams.page - 1) })
  }

  return {
    filters: queryParams,
    searchInput,
    setSearchInput,
    articles: articlesQuery.data ?? [],
    hasNextPage,
    isLoading: articlesQuery.isLoading,
    isFetching: articlesQuery.isFetching,
    isError: articlesQuery.isError,
    error: articlesQuery.error,
    updateFilters,
    nextPage,
    previousPage,
  }
}
