import type { HTMLAttributes, ReactNode } from 'react'

export type CardContentProps = HTMLAttributes<HTMLDivElement> & {
  className?: string
  children: ReactNode
}
