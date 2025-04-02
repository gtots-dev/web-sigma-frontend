import type { CookieInterface } from '@/modules/api/domain/interfaces/cookie-storage.interface'
import type { NextRequest, NextResponse } from 'next/server'

export class NextCookie implements CookieInterface {
  private request: NextRequest
  private response: NextResponse

  constructor(request: NextRequest, response: NextResponse) {
    this.request = request
    this.response = response
  }

  get(cookieName: string): string | null {
    return this.request.cookies.get(cookieName)?.value || null
  }

  set(
    cookieName: string,
    value: string,
    options?: Record<string, unknown>
  ): void {
    this.response.cookies.set(cookieName, value, options)
  }
}
