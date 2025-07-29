import type { NextRequest, NextResponse } from 'next/server'
import { CookiesRepository } from '../repositories/cookies.repository'
import { MiddlewareCookieAdapter } from '@/modules/shared/infrastructure/adapters/middleware-cookies.adapter'

export class CookiesFactory {
  static createReader(req: NextRequest, cookieName: string): CookiesRepository {
    return new CookiesRepository(new MiddlewareCookieAdapter(req), cookieName)
  }

  static createWriter(
    req: NextRequest,
    res: NextResponse,
    cookieName: string
  ): CookiesRepository {
    return new CookiesRepository(
      new MiddlewareCookieAdapter(req, res),
      cookieName
    )
  }
}
