import { DEFAULT_DEBOUNCE_TIME, PAGINATION } from '@/constants/common.constants'

export const isInString = (mainString: string, searchString: string): boolean =>
  mainString?.toLowerCase?.()?.includes(searchString?.toLowerCase?.())

export const paginateArray = <T>(array: T[], page: number) => {
  const totalPages = Math.ceil(array.length / PAGINATION)
  const start = (page - 1) * PAGINATION
  const paginateds = array.slice(start, start + PAGINATION)

  return { totalPages, paginateds }
}

export const getPriceFormat = (price: number) => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price)
}

export const debounceMethod = <T extends (...args: any[]) => void>(
  func: T,
  time = DEFAULT_DEBOUNCE_TIME,
) => {
  let timer: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), time)
  }
}

export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}

export const stripHtml = (value?: string) => value?.replace(/<[^>]+>/g, '').trim() ?? ''
