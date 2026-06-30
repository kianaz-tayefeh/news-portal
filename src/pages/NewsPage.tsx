import { NewsFilters, NewsList } from '@/components/organisms'
import { EmptyContent, Pagination } from '@/components/ui'
import { useNews } from '@/hooks/useNews'
import { Loader } from 'lucide-react'

export default function NewsPage() {
  const {
    filters,
    searchInput,
    setSearchInput,
    articles,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    updateFilters,
    nextPage,
    previousPage,
  } = useNews()

  if (isLoading) return <Loader className='mx-auto mt-8 h-8 w-8 animate-spin' />
  const hasArticles = articles.length > 0

  return (
    <main className='mx-auto min-h-screen max-w-6xl px-4 py-8'>
      <h1 className='mb-8 text-center text-3xl font-bold'>News Portal</h1>

      <NewsFilters
        filters={filters}
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        onChange={updateFilters}
      />

      {isError ? (
        <EmptyContent
          title='Could not load articles'
          message='Try another search or source.'
          variant='error'
        />
      ) : isFetching ? (
        <Loader className='mx-auto mt-8 h-8 w-8 animate-spin' />
      ) : hasArticles ? (
        <NewsList articles={articles} />
      ) : (
        <EmptyContent message='No articles found for your filters.' />
      )}

      {!isError && hasArticles && (
        <Pagination
          page={filters.page}
          hasNextPage={hasNextPage}
          onNext={nextPage}
          onPrevious={previousPage}
        />
      )}
    </main>
  )
}
