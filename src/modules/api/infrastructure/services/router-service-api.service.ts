import { NextResponse, type NextRequest } from 'next/server'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import type {
  HandlerCallback,
  RouterApiFileResponse,
  RouterApiResponse,
  RouterApiGateway
} from '../../domain/interfaces/router-api-service.interface'

export class RouterApiService implements RouterApiGateway {
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
        {
          success: false,
          data: null,
          message: error.message
        },
        HttpStatusCodeEnum.BAD_REQUEST
      )
    }

    const message = error instanceof Error ? error.message : 'Erro inesperado'

    return this.jsonResponse(
      {
        success: false,
        data: null,
        message
      },
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

        if (this.isRouterApiResponse(result)) {
          return this.jsonResponse(
            result.data,
            HttpStatusCodeEnum[result.status]
          )
        }

        return this.jsonResponse(result, HttpStatusCodeEnum.OK)
      } catch (error) {
        return this.handleError(error)
      }
    }
  }

  // === Type guards ==================================================

  private isFileResponse(result: unknown): result is RouterApiFileResponse {
    if (typeof result !== 'object' || result === null) return false
    if (!('data' in result)) return false

    const data = (result as { data?: unknown }).data

    const isBlob = typeof Blob !== 'undefined' && data instanceof Blob
    const isFile = typeof File !== 'undefined' && data instanceof File
    const isArrayBuffer =
      typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer

    return isBlob || isFile || isArrayBuffer
  }

  private isRouterApiResponse<R>(
    result: unknown
  ): result is RouterApiResponse<R> {
    return (
      typeof result === 'object' &&
      result !== null &&
      'data' in result &&
      'status' in result
    )
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
