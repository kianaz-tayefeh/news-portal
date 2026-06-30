import type { NewsSearchParams } from '@/types/news.type'

export type NewsFiltersProps = {
  filters: NewsSearchParams
  searchInput: string
  onSearchChange: (value: string) => void
  onChange: (filters: Partial<NewsSearchParams>) => void
}
