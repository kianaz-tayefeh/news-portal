import type { Article, NewsCategory } from '@/types/news.type'
import { stripHtml } from '@/utils/common'

type NewsApiItem = {
  source?: {
    id?: string | null
    name?: string
  }
  author?: string | null
  title?: string
  description?: string | null
  url?: string
  urlToImage?: string | null
  publishedAt?: string
  content?: string | null
}

export const mapNewsApiArticles = (items: NewsApiItem[], appCategory?: NewsCategory): Article[] => {
  return items
    .filter(item => item.url && item.title)
    .map(item => ({
      id: `newsapi-${item.url}`,
      title: item.title ?? 'Untitled article',
      description: stripHtml(item.description ?? item.content ?? ''),
      url: item.url ?? '',
      imageUrl: item.urlToImage ?? '',
      publishedAt: item.publishedAt ?? '',
      source: 'newsapi',
      sourceName: item.source?.name ?? 'NewsAPI',
      author: item.author ?? 'Unknown author',
      category: appCategory ?? null,
      tags: [],
    }))
}
