import type { DateRange } from '@daypicker/react'
import { format, subDays } from 'date-fns'

export const QUICK_RANGES = [
  {
    label: 'Today',
    getRange: () => ({
      from: new Date(),
      to: new Date(),
    }),
  },
  {
    label: 'Last 7 days',
    getRange: () => ({
      from: subDays(new Date(), 6),
      to: new Date(),
    }),
  },
  {
    label: 'Last 30 days',
    getRange: () => ({
      from: subDays(new Date(), 29),
      to: new Date(),
    }),
  },
]

export const formatDateValue = (date: Date) => format(date, 'yyyy-MM-dd')

export const toDateRange = (fromDate?: string, toDate?: string): DateRange => ({
  from: fromDate ? new Date(fromDate) : undefined,
  to: toDate ? new Date(toDate) : undefined,
})

export const toDateRangeValue = (range?: DateRange) => ({
  fromDate: range?.from ? formatDateValue(range.from) : undefined,
  toDate: range?.to ? formatDateValue(range.to) : undefined,
})

export const getDateRangeLabel = (range: DateRange) => {
  if (range.from && range.to) {
    return `${format(range.from, 'MMM d, yyyy')} - ${format(range.to, 'MMM d, yyyy')}`
  }

  if (range.from) {
    return `${format(range.from, 'MMM d, yyyy')} - Select end date`
  }

  return 'Select date range'
}
