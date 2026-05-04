import { cookies, headers } from 'next/headers'
import { parseSetCookie } from '../utils/parse-set-cookie.util'

export async function applySetCookie(setCookie?: string | string[]) {
  if (!setCookie) return

  const cookiesStore = await cookies()
  const headersList = await headers()
  const isSecureConnection = headersList.get('x-forwarded-proto') === 'https'

  const cookiesArray = Array.isArray(setCookie) ? setCookie : [setCookie]

  for (const cookieStr of cookiesArray) {
    const { key, value, options } = parseSetCookie(cookieStr)
    
    // Browser rejects __Secure- prefix on HTTP even if secure: false is set.
    // We must rename the cookie to its base name on non-HTTPS connections.
    let finalKey = key
    if (!isSecureConnection && key.toLowerCase().startsWith('__secure-')) {
      finalKey = key.substring(9) // Remove '__Secure-'
    }

    cookiesStore.set(finalKey, value, {
      ...options,
      secure: options.secure && isSecureConnection
    })
  }
}
