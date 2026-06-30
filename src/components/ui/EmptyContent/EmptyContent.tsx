import { Text } from '../Text/Text'
import type { EmptyContentProps } from './EmptyContent.types'

export const EmptyContent = ({
  title = 'No articles found',
  message,
  variant = 'empty',
}: EmptyContentProps) => {
  const color = variant === 'error' ? 'danger' : 'primary'

  return (
    <div className='mx-auto mt-10 flex max-w-md flex-col items-center  p-8 text-center'>
      <Text variant='h3' color={color} className='mb-2'>
        {title}
      </Text>

      <Text variant='p' color='muted'>
        {message}
      </Text>
    </div>
  )
}
