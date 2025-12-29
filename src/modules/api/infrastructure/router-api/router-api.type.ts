import type {
  RouterApiFileResponse,
  RouterApiResponse
} from '../../domain/interfaces/router-api-service.interface'

export function isFileResponse(
  result: unknown
): result is RouterApiFileResponse {
  if (typeof result !== 'object' || result === null) {
    return false
  }

  if (!('data' in result)) {
    return false
  }

  const data = (result as { data?: unknown }).data

  return (
    (typeof Blob !== 'undefined' && data instanceof Blob) ||
    (typeof File !== 'undefined' && data instanceof File) ||
    (typeof ArrayBuffer !== 'undefined' &&
      data instanceof ArrayBuffer)
  )
}

export function isRouterApiResponse<R>(
  result: unknown
): result is RouterApiResponse<R> {
  return (
    typeof result === 'object' &&
    result !== null &&
    'data' in result &&
    'status' in result &&
    typeof (result as any).status === 'number'
  )
}
