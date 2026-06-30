import { cn } from '@/utils/common'

import type { BadgeProps } from './Badge.types'

export const Badge = ({ variant = 'default', className, children }: BadgeProps) => {
  return <span className={cn('badge', `badge-${variant}`, className)}>{children}</span>
}
