import { useState } from 'react'
import { Text } from '@/components/ui'
import { SETUP_SOURCE_OPTIONS } from '@/constants/news.constants'
import type { NewsProvider } from '@/types/news.type'
import { cn } from '@/utils/common'
import { getDefaultNewsProviders, setDefaultNewsProviders } from '@/utils/defaultSources'
import { CheckCircle } from 'lucide-react'

export const SetupDefaultSource = () => {
  const [selectedSources, setSelectedSources] = useState<NewsProvider[]>(getDefaultNewsProviders)

  const toggleSource = (source: NewsProvider) => {
    setSelectedSources(currentSources => {
      const isSelected = currentSources.includes(source)
      if (isSelected && currentSources.length === 1) return currentSources

      const nextSources = isSelected
        ? currentSources.filter(currentSource => currentSource !== source)
        : [...currentSources, source]

      return setDefaultNewsProviders(nextSources)
    })
  }

  return (
    <section className='w-full text-left'>
      <Text variant='h3' className='mb-10 text-center'>
        Please select all the sources you want to set as default
      </Text>

      <div className='grid gap-4 sm:grid-cols-3'>
        {SETUP_SOURCE_OPTIONS.map(option => {
          const isSelected = selectedSources.includes(option.source)

          return (
            <button
              key={option.source}
              type='button'
              aria-pressed={isSelected}
              onClick={() => toggleSource(option.source)}
              className={cn(
                'relative overflow-hidden rounded-lg border bg-white text-left shadow-sm transition',
                'hover:-translate-y-0.5 hover:border-[var(--brand-500)] hover:shadow-md',
                'focus:outline-none focus:ring-2 focus:ring-[var(--brand-300)]',
                isSelected
                  ? 'border-[var(--brand-500)] ring-2 ring-[var(--brand-200)]'
                  : 'border-gray-200',
              )}
            >
              <img src={option.imageUrl} alt={option.label} className='h-28 w-full object-cover' />

              <span className='flex min-h-12 items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-gray-900'>
                {option.label}
                {isSelected && <CheckCircle className='h-5 w-5 shrink-0 text-[var(--success)]' />}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
