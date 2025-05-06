import { NextResponse, type NextRequest } from 'next/server'
import {
  isPublicRoute,
  PATHNAMES,
  protectedRoutes
} from '../../configs/pathnames.config'
import { auth } from '@/auth'

export async function WithAuthMiddleware(req: NextRequest) {
  const currentPathname = req.nextUrl.pathname
  const requiresAuth = protectedRoutes.some((route) =>
    currentPathname.startsWith(route)
  )

  if (requiresAuth) {
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
