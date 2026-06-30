import type { HTMLAttributes, ReactNode } from 'react'

export type CardHeaderProps = HTMLAttributes<HTMLDivElement> & {
  className?: string
  children: ReactNode
}
