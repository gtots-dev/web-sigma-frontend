import type { CookieInterface } from '@/modules/api/domain/interfaces/cookie-storage.interface'
import type { NextRequest, NextResponse } from 'next/server'

export class MiddlewareCookieAdapter implements CookieInterface {
  constructor(
    private req: NextRequest,
    private res?: NextResponse
  ) {}

  get(cookieName: string): string | null {
    return this.req.cookies.get(cookieName)?.value ?? null
  }

  set(
    cookieName: string,
    value: string,
    options?: Record<string, unknown>
  ): void {
    if (!this.res) throw new Error('Response object is required to set cookies')
    this.res.cookies.set(cookieName, value, options as unknown)
  }
}
