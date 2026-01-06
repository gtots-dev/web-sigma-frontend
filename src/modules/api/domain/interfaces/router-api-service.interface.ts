import { NextRequest, NextResponse } from 'next/server'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { HttpResponseErrorInterface } from '@/modules/shared/domain/interfaces/http-response-error.interface'

export interface RouterApiFileResponseInterface {
  data: Blob | ArrayBuffer
  status?: HttpStatusCodeEnum
  headers?: Record<string, string>
}

export type NextRouteContext<P> = {
  params?: Promise<P>
}

export type RouterApiResponse<T = unknown> = {
  data: T | Blob | File | ArrayBuffer
  status: HttpStatusCodeEnum | number
  headers?: Record<string, string>
}

export interface ErrorResponseInterface {
  success: boolean
  message: string
}

export type HandlerResult<T> =
  | void
  | T
  | HttpResponseInterface<T>
  | HttpResponseErrorInterface
  | RouterApiResponse<T | ErrorResponseInterface>

export type HandlerCallback<P, R> = (
  params: P,
  req: NextRequest
) => Promise<HandlerResult<R>>

export interface RouterApiGateway {
  GET<P = void, R = unknown>(
    callback: HandlerCallback<P, R>
  ): (
    req: NextRequest,
    context?: NextRouteContext<P>
  ) => Promise<Response | NextResponse>

  POST<P = void, R = unknown>(
    callback: HandlerCallback<P, R>
  ): (
    req: NextRequest,
    context?: NextRouteContext<P>
  ) => Promise<Response | NextResponse>

  PUT<P = void, R = unknown>(
    callback: HandlerCallback<P, R>
  ): (
    req: NextRequest,
    context?: NextRouteContext<P>
  ) => Promise<Response | NextResponse>

  PATCH<P = void, R = unknown>(
    callback: HandlerCallback<P, R>
  ): (
    req: NextRequest,
    context?: NextRouteContext<P>
  ) => Promise<Response | NextResponse>

  DELETE<P = void, R = unknown>(
    callback: HandlerCallback<P, R>
  ): (
    req: NextRequest,
    context?: NextRouteContext<P>
  ) => Promise<Response | NextResponse>
}
