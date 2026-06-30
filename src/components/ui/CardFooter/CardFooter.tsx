import { cn } from '@/utils/common'

import type { CardFooterProps } from './CardFooter.types'

export const CardFooter = ({ className, children }: CardFooterProps) => {
  return <div className={cn('card-footer', className)}>{children}</div>
}
