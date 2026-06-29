import type { Article } from '@/types/news.type'
import { stripHtml } from '@/utils/common'

type GuardianItem = {
  id: string
  webTitle: string
  webUrl: string
  webPublicationDate: string
  sectionName?: string
  fields?: {
    thumbnail?: string
    trailText?: string
    byline?: string
  }
}

export const mapGuardianArticles = (items: GuardianItem[]): Article[] => {
  return items
    .filter(item => item.webUrl && item.webTitle)
    .map(item => ({
      id: `guardian-${item.id}`,
      title: item.webTitle,
      description: stripHtml(item.fields?.trailText ?? ''),
      url: item.webUrl,
      imageUrl: item.fields?.thumbnail ?? '',
      publishedAt: item.webPublicationDate,
      source: 'guardian',
      sourceName: 'The Guardian',
      author: item.fields?.byline ?? 'Unknown author',
      category: item.sectionName ?? null,
      tags: [],
    }))
}
