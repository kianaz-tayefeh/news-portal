import { cn } from '@/utils/common'

import type { ButtonProps } from './Button.types'

export const Button = ({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) => (
  <button className={cn('btn', `btn-${variant}`, `btn-${size}`, className)} {...props} />
)
