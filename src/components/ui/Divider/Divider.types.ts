import type { HTMLAttributes } from 'react'

export type DividerProps = HTMLAttributes<HTMLDivElement> & {
  size?: 'sm' | 'md' | 'lg'
}
