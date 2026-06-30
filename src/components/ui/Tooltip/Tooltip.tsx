import { cn } from '@/utils/common'

import type { TooltipProps } from './Tooltip.types'

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
