export const handleException = (error: Error, errorSource = ''): void => {
  console.error('errorSource', errorSource, error)

  // toast api error or gather them and so on
}
