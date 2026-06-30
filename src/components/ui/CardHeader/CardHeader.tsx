import { cn } from '@/utils/common'

import type { CardHeaderProps } from './CardHeader.types'

export const CardHeader = ({ className, children }: CardHeaderProps) => {
  return <div className={cn('card-header', className)}>{children}</div>
}
