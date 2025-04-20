export interface CookieInterface {
  get(cookieName: string): string | null
  set(
    cookieName: string,
    value: string,
    options?: Record<string, unknown>
  ): void
}
