import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { RouterApiResponseFactory } from './router-api-response.factory'

export class RouterApiErrorHandler {
  constructor(private readonly responseFactory: RouterApiResponseFactory) {}

  handle(error: unknown) {
    if (error instanceof HttpResponseError) {
      return this.responseFactory.json(
        {
          success: false,
          data: null,
          message: error.message
        },
        error.status
      )
    }

    const message = error instanceof Error ? error.message : 'Erro inesperado'

    return this.responseFactory.json(
      {
        success: false,
        data: null,
        message
      },
      Number(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR)
    )
  }
}
