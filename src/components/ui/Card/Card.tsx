import { cn } from '@/utils/common'

import type { CardProps } from './Card.types'

export const Card = ({ className, children }: CardProps) => {
  return <div className={cn('card', className)}>{children}</div>
}
