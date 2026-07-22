import { NextResponse, type NextRequest } from 'next/server'
import { isPublicRoute, PATHNAMES } from '../../configs/pathnames.config'
import { auth } from '@/auth'
import { JwtTokenDecodeFactory } from '@/modules/shared/infrastructure/factories/jwt-decode.factory'

export async function WithAuthMiddleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  const {
    AUTHENTICATION: authPath,
    SYSTEM: systemPath,
    TWO_FACTOR: twoFactorPath
  } = PATHNAMES

  const session = await auth()
  const accessToken = session?.token?.access_token

  const hasTrustedDevice =
    req.cookies.has('trusted_device') ||
    req.cookies.has('__Secure-trusted_device')
  let decodedToken = null
  let isExpired = true

  if (accessToken) {
    try {
      decodedToken = JwtTokenDecodeFactory.create().decode(accessToken)
      isExpired = decodedToken?.exp ? decodedToken.exp * 1000 < Date.now() : true
    } catch (err) {
      console.error('Error decoding JWT token:', err)
    }
  }

  const isAuthenticated = Boolean(accessToken) && !isExpired

  const isAuthPage = pathname === authPath
  const isTwoFactorPage = pathname.startsWith(twoFactorPath)
  const isPublicPage = isPublicRoute(pathname)
  const isSystemPage = pathname.startsWith(systemPath)

  if (!isAuthenticated) {
    if (isSystemPage || isTwoFactorPage) {
      return NextResponse.redirect(new URL(authPath, req.url))
    }
    return null
  }

  const isTwoFactorPending = decodedToken?.type === '2fa_pending'
  const isReleased = !isTwoFactorPending || hasTrustedDevice

  if (!isReleased) {
    if (!isTwoFactorPage) {
      return NextResponse.redirect(new URL(twoFactorPath, req.url))
    }
    return null
  }

  if (isAuthPage || isTwoFactorPage || isPublicPage) {
    return NextResponse.redirect(new URL(systemPath, req.url))
  }

  if (isSystemPage) return null

  return NextResponse.redirect(new URL(systemPath, req.url))
}
