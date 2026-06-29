type NewsPaginationProps = {
  page: number
  onNext: () => void
  onPrevious: () => void
}

export function NewsPagination({ page, onNext, onPrevious }: NewsPaginationProps) {
  return (
    <nav className='mt-8 flex justify-center gap-4'>
      <button disabled={page <= 1} onClick={onPrevious}>
        Previous
      </button>

      <span>Page {page}</span>

      <button onClick={onNext}>Next</button>
    </nav>
  )
}
