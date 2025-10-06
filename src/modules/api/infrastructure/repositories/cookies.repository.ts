import type { CookieInterface } from '../../domain/interfaces/cookie-storage.interface'

export class CookiesRepository {
  private cookie: CookieInterface
  private readonly COOKIE_NAME: string

  constructor(cookie: CookieInterface, cookieName: string) {
    this.cookie = cookie
    this.COOKIE_NAME = cookieName
  }

  saveToCookies<T>(data: T): void {
    this.cookie.set(this.COOKIE_NAME, JSON.stringify(data), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60,
      sameSite: 'strict'
    })
  }

  getFromCookies<T>(): T | null {
    try {
      const cookieValue = this.cookie.get(this.COOKIE_NAME)
      if (!cookieValue) return null
      const data = JSON.parse(cookieValue)
      return data as T
    } catch {
      return null
    }
  }

  removeFromCookies(): void {
    this.cookie.set(this.COOKIE_NAME, '', {
      httpOnly: true,
      path: '/',
      maxAge: 0
    })
  }
}
