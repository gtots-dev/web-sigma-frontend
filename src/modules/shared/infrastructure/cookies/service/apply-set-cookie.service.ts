import { cookies } from 'next/headers'
import { parseSetCookie } from '../utils/parse-set-cookie.util'

export async function applySetCookie(setCookie?: string | string[]) {
  if (!setCookie) return

  const cookiesStore = await cookies()
  const cookiesArray = Array.isArray(setCookie) ? setCookie : [setCookie]

  for (const cookieStr of cookiesArray) {
    const { key, value, options } = parseSetCookie(cookieStr)
    cookiesStore.set(key, value, options)
  }
}
