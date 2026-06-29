import type { Article, NewsCategory } from '@/types/news.type'
import { stripHtml } from '@/utils/common'

export type NewsApiArticle = {
  source?: {
    name?: string
  }
  title?: string
  description?: string | null
  url?: string
  urlToImage?: string | null
  publishedAt?: string
  content?: string | null
}

const isValidNewsApiArticle = (
  item: NewsApiArticle,
): item is NewsApiArticle & { title: string; url: string } => Boolean(item.title && item.url)

export const mapNewsApiArticles = (items: NewsApiArticle[], category?: NewsCategory): Article[] =>
  items.filter(isValidNewsApiArticle).map(item => ({
    id: `newsapi-${item.url}`,
    title: item.title,
    description: stripHtml(item.description ?? item.content ?? ''),
    url: item.url,
    imageUrl: item.urlToImage ?? '',
    publishedAt: item.publishedAt ?? '',
    source: 'newsapi',
    category: category ?? null,
    tags: [],
  }))
