import type { Article } from '@/types/news.type'
import { stripHtml } from '@/utils/common'

export type NyTimesArticle = {
  _id: string
  web_url?: string
  pub_date?: string
  abstract?: string
  section_name?: string
  news_desk?: string
  headline?: {
    main?: string
  }
  multimedia?: {
    default?: {
      url?: string
    }
    thumbnail?: {
      url?: string
    }
  }
  keywords?: {
    name: string
    value: string
  }[]
}

const isValidNyTimesArticle = (
  item: NyTimesArticle,
): item is NyTimesArticle & {
  web_url: string
  headline: { main: string }
} => Boolean(item.web_url && item.headline?.main)

const getNyTimesTags = (keywords: NyTimesArticle['keywords'], category: string | null): string[] =>
  keywords
    ?.filter(keyword => keyword.name === 'Subject')
    .map(keyword => keyword.value)
    .filter(tag => !tag.startsWith('your-feed-'))
    .filter(tag => tag !== category) ?? []

export const mapNyTimesArticles = (items: NyTimesArticle[]): Article[] =>
  items.filter(isValidNyTimesArticle).map(item => {
    const category = item.section_name ?? item.news_desk ?? null

    return {
      id: `nytimes-${item._id}`,
      title: item.headline.main,
      description: stripHtml(item.abstract ?? ''),
      url: item.web_url,
      imageUrl: item.multimedia?.default?.url ?? item.multimedia?.thumbnail?.url ?? '',
      publishedAt: item.pub_date ?? '',
      source: 'nytimes',
      category,
      tags: getNyTimesTags(item.keywords, category),
    }
  })
