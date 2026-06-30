import { cn } from '@/utils/common'

import type { TextProps } from './Text.types'

export function Text({ className, variant = 'p', color = 'primary', ...props }: TextProps) {
  return <p className={cn('text', `variant-${variant}`, `text-${color}`, className)} {...props} />
}
