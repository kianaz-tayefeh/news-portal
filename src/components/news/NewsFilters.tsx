import { DateRangePicker } from '@/components/ui/DateRangePicker'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { NEWS_CATEGORY_OPTIONS, NEWS_SOURCE_OPTIONS } from '@/constants/news.constants'
import type { NewsCategory, NewsSearchParams, SourceFilter } from '@/types/news.type'
import { isNewsApiCategorySearch } from '@/utils/news'
import { Search } from 'lucide-react'

type NewsFiltersProps = {
  filters: NewsSearchParams
  searchInput: string
  onSearchChange: (value: string) => void
  onChange: (filters: Partial<NewsSearchParams>) => void
}

export function NewsFilters({ filters, searchInput, onSearchChange, onChange }: NewsFiltersProps) {
  const isDateDisabled = isNewsApiCategorySearch(filters)

  return (
    <section className='mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      <Input
        name='search'
        value={searchInput}
        placeholder='Search news...'
        icon={<Search className='h-5 w-5' />}
        onChange={event => onSearchChange(event.target.value)}
      />

      <DateRangePicker
        fromDate={filters.fromDate}
        toDate={filters.toDate}
        disabled={isDateDisabled}
        onChange={onChange}
      />

      <Select
        data_testid='category-filter'
        options={NEWS_CATEGORY_OPTIONS}
        value={filters.category ?? ''}
        placeholder='All categories'
        onChange={value => onChange({ category: value ? (value as NewsCategory) : undefined })}
      />

      <Select
        data_testid='source-filter'
        options={NEWS_SOURCE_OPTIONS}
        value={filters.source ?? ''}
        placeholder='Default source'
        onChange={value => onChange({ source: value ? (value as SourceFilter) : undefined })}
      />

      {isDateDisabled && (
        <p className='text-sm text-center mt-10 text-amber-600 sm:col-span-2 lg:col-span-3'>
          Date filters are unavailable for NewsAPI category searches.
        </p>
      )}
    </section>
  )
}
