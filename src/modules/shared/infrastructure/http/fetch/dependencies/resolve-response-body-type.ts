import { ResponseBodyType } from '@/modules/shared/domain/enums/response-body-type.enum'

export function resolveResponseBodyType(contentType: string): ResponseBodyType {
  if (contentType.includes('application/json')) {
    return ResponseBodyType.JSON
  }

  if (
    contentType.includes('image/') ||
    contentType.includes('application/pdf') ||
    contentType.includes('application/octet-stream')
  ) {
    return ResponseBodyType.BINARY
  }

  return ResponseBodyType.TEXT
}
