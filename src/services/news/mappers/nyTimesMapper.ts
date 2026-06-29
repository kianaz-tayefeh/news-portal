import type { Article } from '@/types/news.type'
import { stripHtml } from '@/utils/common'

type NyTimesItem = {
  _id: string
  web_url: string
  pub_date: string
  abstract?: string
  section_name?: string
  news_desk?: string
  keywords?: {
    name: string
    value: string
  }[]
  source?: string
  byline?: {
    original?: string
  }
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
}

export const mapNyTimesArticles = (items: NyTimesItem[] = []): Article[] => {
  return items
    .filter(item => item.web_url && item.headline?.main)
    .map(item => {
      const category = item.section_name ?? item.news_desk ?? null

      return {
        id: `nytimes-${item._id}`,
        title: item.headline?.main ?? 'Untitled article',
        description: stripHtml(item.abstract ?? ''),
        url: item.web_url,
        imageUrl: item.multimedia?.default?.url ?? item.multimedia?.thumbnail?.url ?? '',
        publishedAt: item.pub_date,
        source: 'nytimes',
        sourceName: item.source ?? 'The New York Times',
        author: item.byline?.original ?? 'Unknown author',
        category,
        tags:
          item.keywords
            ?.filter(k => k.name === 'Subject')
            .map(k => k.value)
            .filter(tag => !tag.startsWith('your-feed-'))
            .filter(tag => tag !== category) ?? [],
      }
    })
}
