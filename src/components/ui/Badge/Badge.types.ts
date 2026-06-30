import type { ReactNode } from 'react'

export type BadgeProps = {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default'
  className?: string
  children: ReactNode
}
