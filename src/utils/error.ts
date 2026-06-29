export const handleException = (error: Error, errorSource = ''): void => {
  console.error('errorSource', errorSource, error)

  // toast api error or gather them and so on
}

export const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Unknown error'

export const emptyToUndefined = (value?: string) => value || undefined
