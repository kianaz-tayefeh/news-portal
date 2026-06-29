import { useEffect, useState } from 'react'
import { LG_BREAKPOINT, SM_BREAKPOINT } from '@/constants/common.constants'

export const useResponsiveColumns = (defaultColumns: number) => {
  const [dynamicColumns, setDynamicColumns] = useState(defaultColumns)

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      setDynamicColumns(width < SM_BREAKPOINT ? 1 : width < LG_BREAKPOINT ? 2 : 3)
    }

    updateColumns() // Set initial value
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  return dynamicColumns
}
