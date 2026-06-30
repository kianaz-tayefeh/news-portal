import { useEffect, useMemo, useState } from 'react'
import { useSearchArticles } from '@/api/queries/newsQueries'
import { PAGE_SIZE } from '@/constants/common.constants'
import { Route } from '@/routes/news/index'
import type { NewsSearchParams } from '@/types/news.type'
import { isNewsApiCategorySearch } from '@/utils/news'

import { useDebouncedValue } from './useDebounce'

export const useNews = () => {
  const filters = Route.useSearch()
  const navigate = Route.useNavigate()

  const [searchInput, setSearchInput] = useState(filters.query)
  const debouncedSearch = useDebouncedValue(searchInput)

  const queryParams: NewsSearchParams = useMemo(() => {
    const nextParams: NewsSearchParams = {
      ...filters,
      query: filters.query.trim(),
      page: filters.page ?? 1,
    }

    return isNewsApiCategorySearch(nextParams)
      ? { ...nextParams, fromDate: undefined, toDate: undefined }
      : nextParams
  }, [filters])

  const articlesQuery = useSearchArticles(queryParams)
  const hasNextPage = (articlesQuery.data?.length ?? 0) >= PAGE_SIZE

  const updateFilters = (nextFilters: Partial<NewsSearchParams>) => {
    const hasPageUpdate = nextFilters.page !== undefined

    navigate({
      search: previousFilters => {
        const nextSearch = {
          ...previousFilters,
          ...nextFilters,
          query: (nextFilters.query ?? previousFilters.query).trim(),
          page: hasPageUpdate ? (nextFilters.page ?? 1) : 1,
        }

        return isNewsApiCategorySearch(nextSearch)
          ? { ...nextSearch, fromDate: undefined, toDate: undefined }
          : nextSearch
      },
      replace: true,
    })
  }

  useEffect(() => {
    const nextQuery = debouncedSearch.trim()
    const currentQuery = filters.query.trim()

    if (nextQuery !== currentQuery) {
      updateFilters({ query: nextQuery })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
