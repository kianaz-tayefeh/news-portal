import * as React from 'react'

export function useClickOutside<T extends HTMLElement>(onClickOutside: () => void) {
  const ref = React.useRef<T>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        onClickOutside()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClickOutside])

  return ref
}
