import type { HttpQueryParamsInterface } from '@/modules/shared/domain/interfaces/http-query-params.interface'

export function normalizeQueryParams(
  params: HttpQueryParamsInterface
): Array<[string, string]> {
  const entries: Array<[string, string]> = []

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        entries.push([key, String(v)])
      })
      return
    }

    if (value !== null && value !== undefined) {
      entries.push([key, String(value)])
    }
  })

  return entries
}
