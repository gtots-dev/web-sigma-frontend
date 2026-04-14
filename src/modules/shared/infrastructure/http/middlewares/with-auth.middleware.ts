import { NextResponse, type NextRequest } from 'next/server'
import {
  isPublicRoute,
  isProtectedRoute,
  PATHNAMES
} from '../../configs/pathnames.config'
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

  const isAuthenticated = Boolean(accessToken)
  const isAuthPage = pathname === authPath
  const isTwoFactorPage = pathname === twoFactorPath
  const isPublicPage = isPublicRoute(pathname)
  const isProtectedPage = isProtectedRoute(pathname)

  if (!isAuthenticated && isProtectedPage)
    return NextResponse.redirect(new URL(authPath, req.url))

  if (!isAuthenticated) return null

  const jwtFactory = JwtTokenDecodeFactory.create()
  const decodedToken = jwtFactory.decode(accessToken)
  const requiresTwoFactor = decodedToken.type === '2fa_pending'

  if (requiresTwoFactor && !isTwoFactorPage)
    return NextResponse.redirect(new URL(twoFactorPath, req.url))

  if (requiresTwoFactor) return null

  if (isAuthPage || isTwoFactorPage || isPublicPage)
    return NextResponse.redirect(new URL(systemPath, req.url))

  return null
}
