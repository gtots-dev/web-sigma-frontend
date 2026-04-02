import type { RouterApiFileResponseInterface } from '../../domain/interfaces/router-api-service.interface'

export function isFileResponse(
  result: unknown
): result is RouterApiFileResponseInterface {
  if (typeof result !== 'object' || result === null) return false
  if (!('data' in result)) return false

  const data = (result as { data?: unknown }).data

  return (
    (typeof Blob !== 'undefined' && data instanceof Blob) ||
    (typeof File !== 'undefined' && data instanceof File) ||
    (typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer)
  )
}
