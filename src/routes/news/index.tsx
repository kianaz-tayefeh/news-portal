import NewsPage from '@/pages/NewsPage'
import { newsSearchSchema } from '@/schema/news.schema'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/news/')({
  validateSearch: newsSearchSchema,
  component: NewsPage,
})
