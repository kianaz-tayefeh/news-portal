export type NewsProvider = 'guardian' | 'nytimes' | 'newsapi'

export type SourceFilter = NewsProvider | 'all'

export type NewsCategory =
  | 'business'
  | 'technology'
  | 'sports'
  | 'science'
  | 'health'
  | 'entertainment'
  | 'world'
  | 'nation'
  | 'general'

export type NewsSearchParams = {
  query: string
  page: number
  category?: NewsCategory
  source?: SourceFilter
  fromDate?: string
  toDate?: string
}

export type Article = {
  id: string
  title: string
  description: string
  url: string
  imageUrl: string
  publishedAt: string
  source: NewsProvider
  sourceName: string
  author: string
  category: string | null
  tags: string[]
}

export type NewsSourceApi = {
  source: NewsProvider
  search: (params: NewsSearchParams, signal?: AbortSignal) => Promise<Article[]>
}
