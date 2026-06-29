import { cn } from '@/utils/common'

type TextProps = React.ComponentProps<'p'> & {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'subtitle' | 'small'
  color?: 'primary' | 'secondary' | 'muted' | 'success' | 'danger' | 'brand-900' | 'brand-500'
}

export function Text({ className, variant = 'p', color = 'primary', ...props }: TextProps) {
  return <p className={cn('text', `variant-${variant}`, `text-${color}`, className)} {...props} />
}
