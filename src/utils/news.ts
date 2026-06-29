import type { Article, NewsSearchParams } from '@/types/news.type'

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

export const isNewsApiCategorySearch = (params: NewsSearchParams) =>
  params.source === 'newsapi' && Boolean(params.category)
