import { ROUTES } from '@/constants/common.constants'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className='min-h-screen bg-gray-50 text-gray-900'>
      <header className='border-b bg-white'>
        <nav className='mx-auto flex max-w-6xl items-center justify-between px-4 py-4'>
          <Link to={ROUTES.home} className='font-bold'>
            News Aggregator
          </Link>

          <Link to={ROUTES.news} className='text-sm font-medium'>
            News
          </Link>
        </nav>
      </header>

      <Outlet />
    </div>
  ),
})
