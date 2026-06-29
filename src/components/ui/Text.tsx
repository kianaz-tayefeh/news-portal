import { cn } from '@/utils/common'

type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'subtitle' | 'small'
  color?: 'primary' | 'secondary' | 'muted' | 'success' | 'danger' | 'brand-900' | 'brand-500'
}

export const Text: React.FC<TextProps> = ({
  className,
  variant = 'p',
  color = 'primary',
  ...props
}) => {
  return <p className={cn('text', `variant-${variant}`, `text-${color}`, className)} {...props} />
}
