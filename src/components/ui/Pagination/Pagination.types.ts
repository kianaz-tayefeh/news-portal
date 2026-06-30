export type PaginationProps = {
  page: number
  hasNextPage: boolean
  onNext: () => void
  onPrevious: () => void
}
