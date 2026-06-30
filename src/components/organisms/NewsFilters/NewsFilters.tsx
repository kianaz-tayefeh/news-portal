import { DateRangePicker, Input, Select, Text } from '@/components/ui'
import { NEWS_CATEGORY_OPTIONS, NEWS_SOURCE_OPTIONS } from '@/constants/news.constants'
import type { NewsCategory, SourceFilter } from '@/types/news.type'
import { isNewsApiCategorySearch } from '@/utils/news'
import { Search } from 'lucide-react'

import type { NewsFiltersProps } from './NewsFilters.types'

export const NewsFilters = ({
  filters,
  searchInput,
  onSearchChange,
  onChange,
}: NewsFiltersProps) => {
  const isDateDisabled = isNewsApiCategorySearch(filters)

  return (
    <section className='mb-8 rounded-l bg-white p-5'>
      <div className='space-y-4'>
        {/* Search */}
        <Input
          name='search'
          value={searchInput}
          placeholder='Search news...'
          icon={<Search className='h-5 w-5' />}
          onChange={event => onSearchChange(event.target.value)}
        />

        {/* Filters */}
        <div className='grid gap-4 md:grid-cols-3'>
          <Select
            data_testid='source-filter'
            options={NEWS_SOURCE_OPTIONS}
            value={filters.source ?? ''}
            placeholder='Source'
            onChange={value =>
              onChange({
                source: value ? (value as SourceFilter) : undefined,
              })
            }
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
            onChange={value =>
              onChange({
                category: value ? (value as NewsCategory) : undefined,
              })
            }
          />
        </div>

        {isDateDisabled && (
          <Text variant='small' className='text-center text-amber-600'>
            Date filters are unavailable for category searches.
          </Text>
        )}
      </div>
    </section>
  )
}
