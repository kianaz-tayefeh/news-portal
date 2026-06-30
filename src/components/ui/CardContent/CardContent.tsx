import { cn } from '@/utils/common'

import type { CardContentProps } from './CardContent.types'

export const CardContent = ({ className, children }: CardContentProps) => {
  return <div className={cn('p-4', className)}>{children}</div>
}
