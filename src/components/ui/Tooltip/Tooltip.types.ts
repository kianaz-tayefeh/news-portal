import type { ReactNode } from 'react'

export type TooltipProps = {
  content: ReactNode
  children: ReactNode
  className?: string
  contentClassName?: string
  position?: 'top' | 'bottom'
}
