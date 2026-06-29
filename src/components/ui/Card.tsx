import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/common'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  className?: string
  children: ReactNode
}

export const Card = ({ className, children }: CardProps) => {
  return <div className={cn('card', className)}>{children}</div>
}
