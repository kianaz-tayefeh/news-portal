import type { NewsSearchParams } from '@/types/news.type'

export const NEWS_SOURCES = ['guardian', 'nytimes', 'newsapi', 'all'] as const
export const NEWS_CATEGORIES = [
  'business',
  'technology',
  'sports',
  'science',
  'health',
  'entertainment',
  'general',
  'world',
  'nation',
] as const

export const DEFAULT_PARAMS: NewsSearchParams = {
  query: '',
  page: 1,
}

export const NEWS_CATEGORY_OPTIONS = [
  { label: 'All categories', value: '' },
  { label: 'Business', value: 'business' },
  { label: 'Technology', value: 'technology' },
  { label: 'Sports', value: 'sports' },
  { label: 'Science', value: 'science' },
  { label: 'Health', value: 'health' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'World', value: 'world' },
  { label: 'Nation', value: 'nation' },
  { label: 'General', value: 'general' },
]

export const NEWS_SOURCE_OPTIONS = [
  { label: 'Default source', value: '' },
  { label: 'All sources', value: 'all' },
  { label: 'The Guardian', value: 'guardian' },
  { label: 'New York Times', value: 'nytimes' },
  { label: 'NewsAPI', value: 'newsapi' },
]
