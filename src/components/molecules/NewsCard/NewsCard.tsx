import { Badge, Card, CardContent, CardFooter, Image, Text, Tooltip } from '@/components/ui'
import { Calendar, ExternalLink } from 'lucide-react'

import type { NewsCardProps } from './NewsCard.types'

export function NewsCard({ article }: NewsCardProps) {
  const [firstTag, ...remainingTags] = article.tags
  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString()
    : 'Unknown date'

  return (
    <Card className='flex h-full flex-col'>
      <Image title={article.title} imageUrl={article.imageUrl} />

      <CardContent className='flex flex-1 flex-col gap-4 p-5'>
        <div className='flex flex-wrap gap-2'>
          {article.category && <Badge variant='success'>{article.category}</Badge>}

          {firstTag && <Badge>{firstTag}</Badge>}

          {remainingTags.length > 0 && (
            <Tooltip
              content={
                <div className='flex flex-wrap gap-2'>
                  {remainingTags.map(tag => (
                    <Badge key={tag} className='text-[10px]'>
                      {tag}
                    </Badge>
                  ))}
                </div>
              }
            >
              <Badge className='cursor-pointer'>+{remainingTags.length}</Badge>
            </Tooltip>
          )}
        </div>

        <Text
          variant='h4'
          title={article.title}
          className='line-clamp-2 h-[3.25rem] overflow-hidden leading-6'
        >
          {article.title}
        </Text>

        <Text
          variant='subtitle'
          title={article.description}
          className='line-clamp-3 h-[4.5rem] overflow-hidden leading-6'
        >
          {article.description || 'No description available.'}
        </Text>

        <div className='mt-auto space-y-2 text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <Calendar size={16} />
            <span>{publishedDate}</span>
          </div>

          <Text variant='small' color='muted' className='truncate'>
            {article.source}
          </Text>
        </div>
      </CardContent>

      <CardFooter className='mt-auto border-t p-5'>
        <a
          href={article.url}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 font-medium text-blue-600 hover:underline'
        >
          Read full article
          <ExternalLink size={16} />
        </a>
      </CardFooter>
    </Card>
  )
}
