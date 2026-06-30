import { PAGE_SIZE } from '@/constants/common.constants'
import { getPageSize, stripHtml } from '@/utils/common'
import { getSearchQuery, normalizeArticles } from '@/utils/news'
import { describe, expect, it } from 'vitest'

describe('news utilities', () => {
  it('normalizes articles by removing invalid entries and sorting newest first', () => {
    const articles = normalizeArticles([
      {
        id: 'old',
        title: 'Old article',
        description: '',
        url: 'https://example.com/old',
        imageUrl: '',
        publishedAt: '2026-06-01T00:00:00Z',
        source: 'guardian',
        category: null,
        tags: [],
      },
      {
        id: 'invalid',
        title: '',
        description: '',
        url: 'https://example.com/invalid',
        imageUrl: '',
        publishedAt: '2026-06-30T00:00:00Z',
        source: 'guardian',
        category: null,
        tags: [],
      },
      {
        id: 'new',
        title: 'New article',
        description: '',
        url: 'https://example.com/new',
        imageUrl: '',
        publishedAt: '2026-06-30T00:00:00Z',
        source: 'nytimes',
        category: null,
        tags: [],
      },
    ])

    expect(articles.map(article => article.id)).toEqual(['new', 'old'])
  })

  it('normalizes text and page-size helpers', () => {
    expect(stripHtml('<p>Hello <strong>world</strong></p>')).toBe('Hello world')
    expect(getSearchQuery('  economy  ')).toBe('economy')
    expect(getSearchQuery('')).toBe('latest news')
    expect(getPageSize()).toBe(PAGE_SIZE)
  })
})
