import { NextResponse, type NextRequest } from 'next/server'
import { isPublicRoute, isProtectedRoute, PATHNAMES } from '../../configs/pathnames.config'
import { auth } from '@/auth'

export async function WithAuthMiddleware(req: NextRequest) {
  const currentPathname = req.nextUrl.pathname

  if (isProtectedRoute(currentPathname)) {
    const session = await auth()
    const { AUTHENTICATION, SYSTEM } = PATHNAMES

    if (!session || !session.token?.access_token) {
      return NextResponse.redirect(new URL(AUTHENTICATION, req.url))
    }

    if (isPublicRoute(currentPathname) && session.token?.access_token) {
      return NextResponse.redirect(new URL(SYSTEM, req.url))
    }
  }

  return null
}
