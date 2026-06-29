import React, { useMemo } from 'react'
import { Button } from '@/components/ui/Button'

type PaginationProps = {
  totalPages: number
  currentPage: number
  onChangePage: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = props => {
  const { totalPages, currentPage, onChangePage } = props
  const pages = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages])

  return (
    <div className='flex justify-center items-center gap-2 mt-4'>
      {/* Previous Button */}
      <Button
        variant='outline'
        size='sm'
        onClick={() => onChangePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </Button>

      {/* Page Numbers */}
      {pages.map(page => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'outline'}
          size='sm'
          onClick={() => onChangePage(page)}
        >
          {page}
        </Button>
      ))}

      {/* Next Button */}
      <Button
        variant='outline'
        size='sm'
        onClick={() => onChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        data-testid='next'
      >
        Next
      </Button>
    </div>
  )
}
