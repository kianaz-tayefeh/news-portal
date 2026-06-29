import { NewsCard } from '@/components/news/NewsCard'
import type { Article } from '@/types/news.type'

type NewsListProps = {
  articles: Article[]
}

export function NewsList({ articles }: NewsListProps) {
  if (!articles.length) {
    return <p>No news articles found.</p>
  }

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch'>
      {articles.map(article => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}
