const getLocalStorage = () => {
  if (typeof window === 'undefined') return undefined

  return window.localStorage
}

export const getStorage = (key: string) => getLocalStorage()?.getItem(key) ?? null

export const setStorage = (key: string, value: string) => {
  getLocalStorage()?.setItem(key, value)
}
