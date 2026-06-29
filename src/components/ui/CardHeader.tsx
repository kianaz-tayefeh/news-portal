import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/common'

type CardHeaderProps = HTMLAttributes<HTMLDivElement> & {
  className?: string
  children: ReactNode
}

export const CardHeader = ({ className, children }: CardHeaderProps) => {
  return <div className={cn('card-header', className)}>{children}</div>
}
