import { NEWS_PROVIDERS } from '@/constants/news.constants'
import type { NewsProvider } from '@/types/news.type'
import { getStorage, setStorage } from '@/utils/storage'

export const DEFAULT_NEWS_PROVIDERS: NewsProvider[] = ['guardian']
export const DEFAULT_NEWS_PROVIDERS_STORAGE_KEY = 'news-portal.default-news-providers'

const isNewsProvider = (value: unknown): value is NewsProvider =>
  typeof value === 'string' && NEWS_PROVIDERS.includes(value as NewsProvider)

export const parseDefaultNewsProviders = (value: string | null): NewsProvider[] => {
  if (!value) return DEFAULT_NEWS_PROVIDERS

  try {
    const providers = JSON.parse(value)

    if (!Array.isArray(providers)) return DEFAULT_NEWS_PROVIDERS

    const validProviders = providers.filter(isNewsProvider)
    return validProviders.length ? validProviders : DEFAULT_NEWS_PROVIDERS
  } catch {
    return DEFAULT_NEWS_PROVIDERS
  }
}

export const getDefaultNewsProviders = (): NewsProvider[] =>
  parseDefaultNewsProviders(getStorage(DEFAULT_NEWS_PROVIDERS_STORAGE_KEY))

export const setDefaultNewsProviders = (providers: NewsProvider[]) => {
  const validProviders = providers.filter(isNewsProvider)
  const nextProviders = validProviders.length ? validProviders : DEFAULT_NEWS_PROVIDERS

  setStorage(DEFAULT_NEWS_PROVIDERS_STORAGE_KEY, JSON.stringify(nextProviders))

  return nextProviders
}
