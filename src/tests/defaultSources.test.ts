import { parseDefaultNewsProviders } from '@/utils/defaultSources'
import { describe, expect, it } from 'vitest'

describe('default source preferences', () => {
  it('parses a saved provider list', () => {
    expect(parseDefaultNewsProviders('["guardian","newsapi"]')).toEqual(['guardian', 'newsapi'])
  })

  it('falls back to Guardian for empty, invalid, or unsupported values', () => {
    expect(parseDefaultNewsProviders(null)).toEqual(['guardian'])
    expect(parseDefaultNewsProviders('not-json')).toEqual(['guardian'])
    expect(parseDefaultNewsProviders('["unsupported"]')).toEqual(['guardian'])
  })
})
