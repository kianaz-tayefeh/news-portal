import { Text } from '@/components/ui/Text'

type EmptyContentProps = {
  message: string
}

export const EmptyContent: React.FC<EmptyContentProps> = ({ message }) => (
  <div className='border border-red-500 p-4 rounded-md'>
    <Text variant='h3' color='danger'>
      No Items Found
    </Text>
    <Text variant='h6' color='danger'>
      {message}
    </Text>
  </div>
)
