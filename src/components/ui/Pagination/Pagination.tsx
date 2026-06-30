import { Button } from '../Button/Button'
import type { PaginationProps } from './Pagination.types'

export function Pagination({ page, hasNextPage, onNext, onPrevious }: PaginationProps) {
  return (
    <nav className='mt-8 flex items-center justify-center gap-4' aria-label='News pagination'>
      <Button variant='outline' disabled={page <= 1} onClick={onPrevious}>
        Previous
      </Button>

      <span className='text-sm text-gray-600'>Page {page}</span>

      <Button variant='outline' disabled={!hasNextPage} onClick={onNext}>
        Next
      </Button>
    </nav>
  )
}
