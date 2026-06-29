import type { Article } from '@/types/news.type'

export function cleanParams<T extends Record<string, unknown>>(params: T) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => {
      if (value === undefined || value === null || value === '') return false
      return true
    }),
  )
}

export function normalizeArticles(articles: Article[]) {
  return articles
    .filter(article => article.title && article.url)
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0

      return dateB - dateA
    })
}

export const getSearchQuery = (query?: string) => {
  return query?.trim() || 'latest news'
}
