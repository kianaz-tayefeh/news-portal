import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/common'

type DividerProps = HTMLAttributes<HTMLDivElement> & {
  size?: 'sm' | 'md' | 'lg'
}

export const Divider: React.FC<DividerProps> = ({ size = 'md', className, ...props }) => {
  return <div className={cn('divider', `divider-${size}`, className)} {...props} />
}
