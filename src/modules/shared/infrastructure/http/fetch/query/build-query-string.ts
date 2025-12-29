import type { HttpQueryParamsInterface } from '@/modules/shared/domain/interfaces/http-query-params.interface'
import { normalizeQueryParams } from './normalize-query-params'

export function buildQueryString(params?: HttpQueryParamsInterface): string {
  if (!params) return ''

  const searchParams = new URLSearchParams(normalizeQueryParams(params))

  const query = searchParams.toString()

  return query ? `?${query}` : ''
}
