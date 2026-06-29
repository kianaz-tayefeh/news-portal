import * as React from 'react'
import { DayPicker, type DateRange } from '@daypicker/react'
import { isSameDay } from 'date-fns'
import { Calendar } from 'lucide-react'

import '@daypicker/react/style.css'

import { Button } from '@/components/ui/Button'
import { useClickOutside } from '@/hooks/useClickOutside'
import { cn } from '@/utils/common'
import { getDateRangeLabel, QUICK_RANGES, toDateRange, toDateRangeValue } from '@/utils/dateRange'

type DateRangePickerProps = {
  fromDate?: string
  toDate?: string
  disabled?: boolean
  onChange: (value: { fromDate?: string; toDate?: string }) => void
}

export function DateRangePicker({
  fromDate,
  toDate,
  disabled = false,
  onChange,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [draftRange, setDraftRange] = React.useState<DateRange>()

  const wrapperRef = useClickOutside<HTMLDivElement>(() => setOpen(false))

  const selected = draftRange ?? toDateRange(fromDate, toDate)
  const label = getDateRangeLabel(toDateRange(fromDate, toDate))

  const updateRange = (range?: DateRange) => {
    setDraftRange(range)

    if (!range?.from || !range.to) return
    if (isSameDay(range.from, range.to)) return

    onChange(toDateRangeValue(range))
    setDraftRange(undefined)
    setOpen(false)
  }

  const applyRange = (range: DateRange) => {
    onChange(toDateRangeValue(range))
    setDraftRange(undefined)
    setOpen(false)
  }

  const clearRange = () => {
    onChange({
      fromDate: undefined,
      toDate: undefined,
    })
    setDraftRange(undefined)
    setOpen(false)
  }

  return (
    <div ref={wrapperRef} className='relative w-full'>
      <Button
        type='button'
        variant='outline'
        disabled={disabled}
        className='h-11 w-full justify-between bg-white text-gray-900 disabled:cursor-not-allowed disabled:opacity-60'
        onClick={() => {
          if (!disabled) setOpen(prev => !prev)
        }}
      >
        <span className={cn(!fromDate && 'text-gray-400')}>{label}</span>
        <Calendar className='h-5 w-5' />
      </Button>

      {open && !disabled && (
        <div className='absolute z-20 mt-2 w-[320px] rounded-lg border border-[var(--border)] bg-white p-3 shadow-lg'>
          <div className='mb-3 grid grid-cols-2 gap-2'>
            {QUICK_RANGES.map(({ label, getRange }) => (
              <Button
                key={label}
                type='button'
                variant='secondary'
                size='sm'
                onClick={() => applyRange(getRange())}
              >
                {label}
              </Button>
            ))}

            <Button type='button' variant='ghost' size='sm' onClick={clearRange}>
              Clear
            </Button>
          </div>

          <DayPicker mode='range' selected={selected} numberOfMonths={1} onSelect={updateRange} />
        </div>
      )}
    </div>
  )
}
