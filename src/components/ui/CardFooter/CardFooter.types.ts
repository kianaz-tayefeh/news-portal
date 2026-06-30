import type { HTMLAttributes, ReactNode } from 'react'

export type CardFooterProps = HTMLAttributes<HTMLDivElement> & {
  className?: string
  children: ReactNode
}
