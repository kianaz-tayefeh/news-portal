import type { NewsCategory, NewsSource } from '@/types/news.type'

const categoryMap: Record<NewsSource, Partial<Record<NewsCategory, string>>> = {
  guardian: {
    business: 'business',
    technology: 'technology',
    sports: 'sport',
    science: 'science',
    health: 'society',
    entertainment: 'culture',
    world: 'world',
    nation: 'uk-news',
    general: '',
  },

  nytimes: {
    business: 'Business',
    technology: 'Technology',
    sports: 'Sports',
    science: 'Science',
    health: 'Well',
    entertainment: 'Arts',
    world: 'World',
    nation: 'U.S.',
    general: '',
  },

  newsapi: {
    business: 'business',
    technology: 'technology',
    sports: 'sports',
    science: 'science',
    health: 'health',
    entertainment: 'entertainment',
    world: 'general',
    nation: 'general',
    general: 'general',
  },
}

export const getProviderCategory = (source: NewsSource, category?: NewsCategory) => {
  if (!category) return undefined

  return categoryMap[source][category] || undefined
}
