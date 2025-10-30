import { NextRequest, NextResponse } from 'next/server'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'

export interface RouterApiFileResponse {
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

export interface ErrorResponse {
  success: false
  message: string
}

export type HandlerCallback<P = void, R = unknown> = (
  params: P,
  req?: NextRequest
) => Promise<void | R | RouterApiResponse<R | ErrorResponse>>

export interface RouterApiServiceInterface {
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
