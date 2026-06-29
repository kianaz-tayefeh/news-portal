import * as React from 'react'
import { cn } from '@/utils/common'
import { ChevronDown } from 'lucide-react'

type SelectOption = {
  value: string
  label: string
}

type SelectProps = {
  options: SelectOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  data_testid: string
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className,
  data_testid,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className='relative w-full'>
      {/* Select Button */}
      <button
        type='button'
        className={cn('select-btn', className)}
        onClick={() => setIsOpen(prev => !prev)}
        data-testid={data_testid}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {options.find(o => o.value === value)?.label || placeholder}
        </span>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className='select-dropdown' role='listbox'>
          {options.map(option => (
            <li
              key={option.value}
              className='select-item'
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
