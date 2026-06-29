import { Badge, Card, CardContent, CardFooter, Text } from '@/components/ui'
import { Tooltip } from '@/components/ui/Tooltip'
import type { Article } from '@/types/news.type'
import { Calendar, ExternalLink } from 'lucide-react'

type NewsCardProps = {
  article: Article
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Card className='flex h-full flex-col'>
      <div className='overflow-hidden rounded-t-lg'>
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            loading='lazy'
            className='h-48 w-full object-cover'
            onError={event => {
              event.currentTarget.src = '/placeholder-news.jpg'
            }}
          />
        ) : (
          <div className='flex h-48 w-full items-center justify-center bg-gray-100 text-sm text-gray-400'>
            No image available
          </div>
        )}
      </div>

      <CardContent className='flex flex-1 flex-col gap-4 p-5'>
        <div className='flex flex-wrap gap-2'>
          {article.category && <Badge variant='success'>{article.category}</Badge>}

          {article.tags.slice(0, 1).map(tag => (
            <Badge key={tag}>{tag}</Badge>
          ))}

          {article.tags.length > 1 && (
            <Tooltip
              content={
                <div className='flex flex-wrap gap-2'>
                  {article.tags.slice(1).map(tag => (
                    <Badge key={tag} className='text-[10px]'>
                      {tag}
                    </Badge>
                  ))}
                </div>
              }
            >
              <Badge className='cursor-pointer'>+{article.tags.length - 1}</Badge>
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
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>

          <p className='truncate'>{article.source}</p>
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
