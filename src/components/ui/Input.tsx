import * as React from 'react'
import { cn } from '@/utils/common'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode
  name: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', icon, name, ...props }, ref) => (
    <div className='input-wrapper'>
      {icon && <div className='input-icon'>{icon}</div>}
      <input
        type={type}
        name={name}
        className={cn('input', icon ? 'pl-10' : '', className)}
        ref={ref}
        {...props}
      />
    </div>
  ),
)

Input.displayName = 'Input'
