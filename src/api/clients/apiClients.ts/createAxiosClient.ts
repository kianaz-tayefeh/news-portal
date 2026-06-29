import axios, { type AxiosRequestConfig } from 'axios'

type CreateApiClientParams = {
  baseUrl: string
  headers?: Record<string, string>
}

export const createApiClient = ({ baseUrl, headers }: CreateApiClientParams) => {
  const client = axios.create({
    baseURL: baseUrl,
    headers,
  })

  return {
    get: <T>(config: AxiosRequestConfig) => client.get<T>(config.url || '', config),
  }
}
