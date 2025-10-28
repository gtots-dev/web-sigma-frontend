import { NextRequest, NextResponse } from 'next/server'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'

export type NextRouteContext<P> = {
  params?: Promise<P>
}

export interface RouterApiResponse<R = unknown> {
  data: R
  status: HttpStatusCodeEnum
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
  ): (req: NextRequest, context?: NextRouteContext<P>) => Promise<NextResponse>

  POST<P = void, R = unknown>(
    callback: HandlerCallback<P, R>
  ): (req: NextRequest, context?: NextRouteContext<P>) => Promise<NextResponse>

  PUT<P = void, R = unknown>(
    callback: HandlerCallback<P, R>
  ): (req: NextRequest, context?: NextRouteContext<P>) => Promise<NextResponse>

  PATCH<P = void, R = unknown>(
    callback: HandlerCallback<P, R>
  ): (req: NextRequest, context?: NextRouteContext<P>) => Promise<NextResponse>

  DELETE<P = void, R = unknown>(
    callback: HandlerCallback<P, R>
  ): (req: NextRequest, context?: NextRouteContext<P>) => Promise<NextResponse>
}
