import { cn } from '@/utils/common'

import type { DividerProps } from './Divider.types'

export const Divider = ({ size = 'md', className, ...props }: DividerProps) => {
  return <div className={cn('divider', `divider-${size}`, className)} {...props} />
}
