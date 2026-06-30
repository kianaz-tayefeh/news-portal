import { NewsCard } from '@/components/molecules'
import { EmptyContent } from '@/components/ui'

import type { NewsListProps } from './NewsList.types'

export function NewsList({ articles }: NewsListProps) {
  if (!articles.length) {
    return <EmptyContent message='Try adjusting your search or filters.' />
  }

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch'>
      {articles.map(article => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}
