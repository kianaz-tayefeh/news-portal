import { PAGE_SIZE } from '@/constants/common.constants'

export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ')
}

export const stripHtml = (value?: string) => value?.replace(/<[^>]+>/g, '').trim() ?? ''

export const getPageSize = (source?: string) =>
  source === 'all' ? PAGE_SIZE.all : PAGE_SIZE.single
