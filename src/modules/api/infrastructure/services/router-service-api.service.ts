import { NextResponse, type NextRequest } from 'next/server'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import type {
  HandlerCallback,
  RouterApiFileResponse,
  RouterApiResponse,
  RouterApiServiceInterface
} from '../../domain/interfaces/router-api-service.interface'

export class RouterApiService implements RouterApiServiceInterface {
  constructor() {}

  // === Helpers ======================================================

  private jsonResponse(data: unknown, status = HttpStatusCodeEnum.OK) {
    return NextResponse.json(JSON.parse(JSON.stringify(data ?? null)), {
      status: Number(status)
    })
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
        const params = await context?.params
        const result = await callback(params, req)

        if (!result) return this.noContent()

        if (this.isFileResponse(result)) {
          return new Response(result.data, {
            status: Number(result.status),
            headers: result.headers
          })
        }

        const { data, status } = this.extractResponse(result)
        return this.jsonResponse(data, status)
      } catch (error) {
        return this.handleError(error)
      }
    }
  }

  private isFileResponse(result: any): result is RouterApiFileResponse {
    return result?.data instanceof Blob || result?.data instanceof ArrayBuffer
  }

  private extractResponse<R>(
    result: R | RouterApiResponse<R | Blob | File | ArrayBuffer>
  ): {
    data: R | Blob | File | ArrayBuffer
    status: HttpStatusCodeEnum
  } {
    if (this.isRouterApiResponse(result)) {
      return {
        data: result.data,
        status: HttpStatusCodeEnum.OK
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
