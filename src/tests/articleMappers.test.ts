import { mapGuardianArticles } from '@/services/news/mappers/guardianMapper'
import { mapNewsApiArticles } from '@/services/news/mappers/newsMapper'
import { mapNyTimesArticles } from '@/services/news/mappers/nyTimesMapper'
import { describe, expect, it } from 'vitest'

describe('article mappers', () => {
  it('maps valid NewsAPI articles and filters invalid ones', () => {
    const articles = mapNewsApiArticles(
      [
        {
          title: 'News title',
          description: '<p>Useful summary</p>',
          url: 'https://example.com/news',
          urlToImage: null,
          publishedAt: '2026-06-30T10:00:00Z',
        },
        {
          title: 'Missing URL',
        },
      ],
      'technology',
    )

    expect(articles).toEqual([
      {
        id: 'newsapi-https://example.com/news',
        title: 'News title',
        description: 'Useful summary',
        url: 'https://example.com/news',
        imageUrl: '',
        publishedAt: '2026-06-30T10:00:00Z',
        source: 'newsapi',
        category: 'technology',
        tags: [],
      },
    ])
  })

  it('maps Guardian articles to the shared article shape', () => {
    const articles = mapGuardianArticles([
      {
        id: 'world/2026/example',
        webTitle: 'Guardian title',
        webUrl: 'https://theguardian.com/example',
        webPublicationDate: '2026-06-29T08:00:00Z',
        sectionName: 'World',
        fields: {
          thumbnail: 'https://images.example.com/guardian.jpg',
          trailText: '<strong>Guardian summary</strong>',
        },
      },
    ])

    expect(articles[0]).toMatchObject({
      id: 'guardian-world/2026/example',
      title: 'Guardian title',
      description: 'Guardian summary',
      url: 'https://theguardian.com/example',
      imageUrl: 'https://images.example.com/guardian.jpg',
      publishedAt: '2026-06-29T08:00:00Z',
      source: 'guardian',
      category: 'World',
      tags: [],
    })
  })

  it('maps NYTimes articles and removes duplicate/noisy subject tags', () => {
    const articles = mapNyTimesArticles([
      {
        _id: 'nyt-1',
        web_url: 'https://nytimes.com/example',
        pub_date: '2026-06-28T07:00:00Z',
        abstract: '<p>NYTimes summary</p>',
        section_name: 'Technology',
        headline: {
          main: 'NYTimes title',
        },
        multimedia: {
          default: {
            url: 'https://static.nyt.com/image.jpg',
          },
        },
        keywords: [
          { name: 'Subject', value: 'Technology' },
          { name: 'Subject', value: 'Artificial Intelligence' },
          { name: 'Subject', value: 'your-feed-science' },
          { name: 'Person', value: 'Ada Lovelace' },
        ],
      },
    ])

    expect(articles[0]).toMatchObject({
      id: 'nytimes-nyt-1',
      title: 'NYTimes title',
      description: 'NYTimes summary',
      url: 'https://nytimes.com/example',
      imageUrl: 'https://static.nyt.com/image.jpg',
      publishedAt: '2026-06-28T07:00:00Z',
      source: 'nytimes',
      category: 'Technology',
      tags: ['Artificial Intelligence'],
    })
  })
})
