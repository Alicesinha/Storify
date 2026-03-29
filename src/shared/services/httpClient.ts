import axios from 'axios'
import { logger } from '@shared/logger'

import { API_BASE_URL } from '@env'


const TIMEOUT = 10000
const MAX_RETRIES = 3

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
})

const shouldRetry = (retryCount: number): boolean => retryCount < MAX_RETRIES

const getRetryDelay = (retryCount: number): number => 1000 * retryCount

const wait = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms))

httpClient.interceptors.request.use(config => {
  logger.info('HTTP_REQUEST', { method: config.method, url: config.url })
  return config
})

httpClient.interceptors.response.use(
  response => response,
  async error => {
    const config = error.config ?? {}
    const retryCount: number = config.__retryCount ?? 0

    if (!shouldRetry(retryCount)) {
      logger.error('HTTP_ERROR', { url: config.url, message: error.message })
      return Promise.reject(error)
    }

    config.__retryCount = retryCount + 1

    logger.warn('HTTP_RETRY', { url: config.url, attempt: config.__retryCount })

    await wait(getRetryDelay(config.__retryCount))

    return httpClient(config)
  },
)

