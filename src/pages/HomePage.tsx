import { Text } from '@/components/ui/Text'
import { ROUTES } from '@/constants/common.constants'
import { Link } from '@tanstack/react-router'

export default function HomePage() {
  return (
    <main className='mx-auto flex max-w-xl flex-col items-center justify-center px-4 py-16 text-center'>
      <Text variant='h1' className='mb-3'>
        News Aggregator
      </Text>

      <Text variant='subtitle' color='muted' className='mb-6 max-w-md'>
        Browse the latest news from trusted sources in one place.
      </Text>

      <Link
        to={ROUTES.news}
        className='rounded-lg bg-black px-5 py-2.5 font-medium text-white transition hover:bg-gray-800'
      >
        Browse News
      </Link>
    </main>
  )
}
