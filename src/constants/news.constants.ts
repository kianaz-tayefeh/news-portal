import type { NewsProvider, NewsSearchParams, SetupSourceOption } from '@/types/news.type'

export const SOURCES_NAMES: Record<string, NewsProvider> = {
  nytimes: 'nytimes',
  guardian: 'guardian',
  newsapi: 'newsapi',
}

export const NEWS_PROVIDERS = [
  SOURCES_NAMES.guardian,
  SOURCES_NAMES.nytimes,
  SOURCES_NAMES.newsapi,
] as const

export const ALL_SOURCES = 'all'
export const NEWS_SOURCES = [...NEWS_PROVIDERS, ALL_SOURCES] as const

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
  { label: 'All sources', value: ALL_SOURCES },
  { label: 'The Guardian', value: SOURCES_NAMES.guardian },
  { label: 'New York Times', value: SOURCES_NAMES.nytimes },
  { label: 'NewsAPI', value: SOURCES_NAMES.newsapi },
]

export const SETUP_SOURCE_OPTIONS: SetupSourceOption[] = [
  {
    source: 'guardian',
    label: 'The Guardian',
    imageUrl: '/source-logos/guardian.svg',
  },
  {
    source: 'nytimes',
    label: 'New York Times',
    imageUrl: '/source-logos/nytimes.svg',
  },
  {
    source: 'newsapi',
    label: 'NewsAPI',
    imageUrl: '/source-logos/newsapi.svg',
  },
]
