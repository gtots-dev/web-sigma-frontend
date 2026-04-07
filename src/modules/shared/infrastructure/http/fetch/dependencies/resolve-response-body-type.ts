import { ResponseBodyType } from '@/modules/shared/domain/enums/response-body-type.enum'

export function resolveResponseBodyType(contentType: string): ResponseBodyType {
  const normalized = contentType.toLowerCase()

  if (normalized.includes('application/json')) return ResponseBodyType.JSON

  if (
    normalized.includes('image/') ||
    normalized.includes('application/pdf') ||
    normalized.includes('application/octet-stream') ||
    normalized.includes('blob')
  )
    return ResponseBodyType.BINARY

  return ResponseBodyType.TEXT
}
