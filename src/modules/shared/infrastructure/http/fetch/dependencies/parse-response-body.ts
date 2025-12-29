import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { resolveResponseBodyType } from './resolve-response-body-type'
import { responseParsers } from './response-parsers'
import { getContentType } from './response-content-type'

export type ParseResponseBody = <T>(response: Response) => Promise<T | null>

export const parseResponseBody: ParseResponseBody = async <T>(
  response: Response
) => {
  if (response.status === Number(HttpStatusCodeEnum.NO_CONTENT)) {
    return null
  }

  const contentType = getContentType(response)
  const bodyType = resolveResponseBodyType(contentType)

  return responseParsers[bodyType]<T>(response)
}
