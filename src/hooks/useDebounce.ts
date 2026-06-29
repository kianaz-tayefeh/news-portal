import { useEffect, useState } from 'react'
import { DEFAULT_DEBOUNCE_TIME } from '@/constants/common.constants'

export function useDebouncedValue<T>(value: T, delay = DEFAULT_DEBOUNCE_TIME) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => window.clearTimeout(timeoutId)
  }, [value, delay])

  return debouncedValue
}
