import type { RequestInterceptor } from '../services/execute-request.service'
import { cleanPayload } from '@/modules/shared/presentation/utils/clean-payload.util'

export const sanitizePayloadInterceptor: RequestInterceptor = (config) => {
  if (config.data && typeof config.data === 'object') {
    const sanitizedData = cleanPayload(config.data)
    return {
      ...config,
      data: sanitizedData
    }
  }
  return config
}
