import { ROUTES } from '@/constants/common.constants'
import { Link } from '@tanstack/react-router'

export default function HomePage() {
  return (
    <main className='mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 text-center'>
      <h1 className='mb-4 text-4xl font-bold'>News Aggregator</h1>

      <p className='mb-8 max-w-2xl text-gray-600'>
        Search, filter, and personalize your news feed from multiple trusted sources.
      </p>

      <Link
        to={ROUTES.news}
        className='rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800'
      >
        Browse News
      </Link>
    </main>
  )
}
