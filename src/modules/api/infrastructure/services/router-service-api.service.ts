import { NextResponse, type NextRequest } from 'next/server'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import type { RouterApiServiceInterface } from '../../domain/interfaces/router-api-service.interface'

interface RouterApiResponse<R> {
  data: R
  status?: HttpStatusCodeEnum
}

type HandlerCallback<P, R> = (
  params: P,
  req?: NextRequest
) => Promise<R | RouterApiResponse<R> | void>

export class RouterApiService implements RouterApiServiceInterface {
  constructor() {}

  // === Helpers ======================================================

  private jsonResponse(data: unknown, status = HttpStatusCodeEnum.OK) {
    return NextResponse.json(data, { status: Number(status) })
  }

  private noContent() {
    return this.jsonResponse(null, HttpStatusCodeEnum.NO_CONTENT)
  }

  private handleError(error: unknown) {
    console.error('RouterApi Error:', error)

    if (error instanceof HttpResponseError) {
      return this.jsonResponse(
        { success: false, data: null, message: error.message },
        HttpStatusCodeEnum.BAD_REQUEST
      )
    }

    const message = error instanceof Error ? error.message : 'Erro inesperado'

    return this.jsonResponse(
      { success: false, data: null, message },
      HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
    )
  }

  // === Core handler =================================================

  private handler<P, R>(callback: HandlerCallback<P, R>) {
    return async (req: NextRequest, context?: { params?: Promise<P> }) => {
      try {
        const params = await context.params
        const result = await callback(params, req)

        if (typeof result === 'undefined') return this.noContent()

        const { data, status } = this.extractResponse(result)
        return this.jsonResponse(data, status)
      } catch (error) {
        return this.handleError(error)
      }
    }
  }

  private extractResponse<R>(result: R | RouterApiResponse<R>): {
    data: R
    status: HttpStatusCodeEnum
  } {
    if (this.isRouterApiResponse(result)) {
      return {
        data: result.data,
        status: result.status ?? HttpStatusCodeEnum.OK
      }
    }
    return { data: result, status: HttpStatusCodeEnum.OK }
  }

  private isRouterApiResponse<R>(
    result: unknown
  ): result is RouterApiResponse<R> {
    return typeof result === 'object' && result !== null && 'data' in result
  }

  // === Public HTTP methods =========================================

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
