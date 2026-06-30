import type { ComponentProps } from 'react'

export type TextProps = ComponentProps<'p'> & {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'subtitle' | 'small'
  color?: 'primary' | 'secondary' | 'muted' | 'success' | 'danger' | 'brand-900' | 'brand-500'
}
