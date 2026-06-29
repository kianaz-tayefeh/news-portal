import { Text } from '@/components/ui/Text'

type EmptyContentProps = {
  title?: string
  message: string
  variant?: 'empty' | 'error'
}

export const EmptyContent: React.FC<EmptyContentProps> = ({
  title = 'No articles found',
  message,
  variant = 'empty',
}) => {
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
