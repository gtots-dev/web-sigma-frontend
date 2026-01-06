import type { NextRequest } from 'next/server'
import type {
  HandlerCallback,
  RouterApiGateway
} from '../../domain/interfaces/router-api-service.interface'
import { RouterApiResponseFactory } from './router-api-response.factory'
import { RouterApiErrorHandler } from './router-api-error.handler'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import { isFileResponse } from './router-api.type'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'

export class RouterApiService implements RouterApiGateway {
  private readonly responseFactory = new RouterApiResponseFactory()

  private readonly errorHandler = new RouterApiErrorHandler(
    this.responseFactory
  )

  private isHttpResponse(
    value: unknown
  ): value is HttpResponseInterface<unknown> {
    return (
      typeof value === 'object' &&
      value !== null &&
      'success' in value &&
      'status' in value
    )
  }

  private handler<P, R>(callback: HandlerCallback<P, R>) {
    return async (req: NextRequest, context?: { params?: Promise<P> }) => {
      try {
        const params = await context?.params
        const result = await callback(params, req)

        if (!result) {
          return this.responseFactory.noContent()
        }

        if (isFileResponse(result)) {
          return this.responseFactory.file(
            result.data,
            Number(result.status),
            result.headers
          )
        }

        if (this.isHttpResponse(result)) {
          if (!result.success) {
            throw new HttpResponseError(
              result.message ?? 'Erro de inesperado',
              result.status
            )
          }

          return this.responseFactory.json(result.data, result.status)
        }

        return this.responseFactory.ok(result)
      } catch (error) {
        return this.errorHandler.handle(error)
      }
    }
  }

  GET<P, R>(callback: HandlerCallback<P, R>) {
    return this.handler(callback)
  }

  POST<P, R>(callback: HandlerCallback<P, R>) {
    return this.handler(callback)
  }

  PUT<P, R>(callback: HandlerCallback<P, R>) {
    return this.handler(callback)
  }

  PATCH<P, R>(callback: HandlerCallback<P, R>) {
    return this.handler(callback)
  }

  DELETE<P, R>(callback: HandlerCallback<P, R>) {
    return this.handler(callback)
  }
}
