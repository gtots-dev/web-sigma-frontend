import type { NextRequest } from 'next/server'
import type {
  HandlerCallback,
  RouterApiGateway
} from '../../domain/interfaces/router-api-service.interface'

import { RouterApiResponseFactory } from './router-api-response.factory'
import { RouterApiErrorHandler } from './router-api-error.handler'
import { isFileResponse, isRouterApiResponse } from './router-api.type'

export class RouterApiService implements RouterApiGateway {
  private readonly responseFactory = new RouterApiResponseFactory()

  private readonly errorHandler = new RouterApiErrorHandler(
    this.responseFactory
  )

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

        if (isRouterApiResponse<R>(result)) {
          return this.responseFactory.json(result.data, Number(result.status))
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
