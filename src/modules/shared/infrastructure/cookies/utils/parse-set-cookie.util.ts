import type { ParsedCookie } from '../types/parsed-cookie.type'
import type { CookieOptions } from '../types/cookie-options.type'

export function parseSetCookie(cookieStr: string): ParsedCookie {
  const parts = cookieStr.split(';').map((p) => p.trim())

  const [namePart, ...attrParts] = parts
  const [key, ...valueParts] = namePart.split('=')

  const value = valueParts.join('=')

  const options: CookieOptions = {}

  for (const attr of attrParts) {
    const [attrKey, attrValue] = attr.split('=')

    switch (attrKey.toLowerCase()) {
      case 'expires':
        if (attrValue) options.expires = new Date(attrValue)
        break

      case 'path':
        options.path = attrValue
        break

      case 'samesite':
        options.sameSite = attrValue?.toLowerCase() as CookieOptions['sameSite']
        break

      case 'secure':
        options.secure = true
        break

      case 'httponly':
        options.httpOnly = true
        break
    }
  }

  return { key, value, options }
}
