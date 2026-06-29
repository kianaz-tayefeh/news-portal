import type { ReactNode } from 'react'
import { cn } from '@/utils/common'

type TooltipProps = {
  content: ReactNode
  children: ReactNode
  className?: string
  contentClassName?: string
  position?: 'top' | 'bottom'
}

export const Tooltip = ({
  content,
  children,
  className,
  contentClassName,
  position = 'top',
}: TooltipProps) => {
  return (
    <span className={cn('tooltip', className)}>
      {children}

      <span className={cn('tooltip-content', `tooltip-${position}`, contentClassName)}>
        {content}
      </span>
    </span>
  )
}
