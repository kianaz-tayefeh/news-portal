import { getProviderCategory } from '@/services/news/mappers/categoryMapper'
import { describe, expect, it } from 'vitest'

describe('getProviderCategory', () => {
  it('maps shared categories to provider-specific values', () => {
    expect(getProviderCategory('guardian', 'sports')).toBe('sport')
    expect(getProviderCategory('nytimes', 'nation')).toBe('U.S.')
    expect(getProviderCategory('newsapi', 'technology')).toBe('technology')
  })

  it('returns undefined for unselected or unsupported provider categories', () => {
    expect(getProviderCategory('guardian')).toBeUndefined()
    expect(getProviderCategory('guardian', 'general')).toBeUndefined()
    expect(getProviderCategory('newsapi', 'world')).toBeUndefined()
    expect(getProviderCategory('newsapi', 'nation')).toBeUndefined()
  })
})
