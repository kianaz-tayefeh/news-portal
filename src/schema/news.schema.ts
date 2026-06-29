import { NEWS_CATEGORIES, NEWS_SOURCES } from '@/constants/news.constants'
import { z } from 'zod'

export const newsSearchSchema = z.object({
  query: z.string().catch(''),
  page: z.coerce.number().int().positive().catch(1),
  category: z.enum(NEWS_CATEGORIES).optional(),
  source: z.enum(NEWS_SOURCES).optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
})

export type NewsSearchParams = z.infer<typeof newsSearchSchema>
