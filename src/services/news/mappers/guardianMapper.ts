import type { Article } from '@/types/news.type'
import { stripHtml } from '@/utils/common'

export type GuardianArticle = {
  id: string
  webTitle?: string
  webUrl?: string
  webPublicationDate?: string
  sectionName?: string
  fields?: {
    thumbnail?: string
    trailText?: string
  }
}

const isValidGuardianArticle = (
  item: GuardianArticle,
): item is GuardianArticle & { webTitle: string; webUrl: string } =>
  Boolean(item.webTitle && item.webUrl)

export const mapGuardianArticles = (items: GuardianArticle[]): Article[] =>
  items.filter(isValidGuardianArticle).map(item => ({
    id: `guardian-${item.id}`,
    title: item.webTitle,
    description: stripHtml(item.fields?.trailText ?? ''),
    url: item.webUrl,
    imageUrl: item.fields?.thumbnail ?? '',
    publishedAt: item.webPublicationDate ?? '',
    source: 'guardian',
    category: item.sectionName ?? null,
    tags: [],
  }))
