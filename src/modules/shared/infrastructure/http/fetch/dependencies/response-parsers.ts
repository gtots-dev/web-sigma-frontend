import { ResponseBodyType } from '@/modules/shared/domain/enums/response-body-type.enum'

type ResponseParser = <T>(response: Response) => Promise<T>

export const responseParsers: Record<ResponseBodyType, ResponseParser> = {
  [ResponseBodyType.JSON]: async <T>(response: Response) =>
    (await response.json()) as T,

  [ResponseBodyType.BINARY]: async <T>(response: Response) =>
    (await response.blob()) as T,

  [ResponseBodyType.TEXT]: async <T>(response: Response) =>
    (await response.text()) as T
}
