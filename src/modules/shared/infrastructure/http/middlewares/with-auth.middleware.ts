import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import {
  isPublicRoute,
  PATHNAMES,
  protectedRoutes
} from '../../config/pathnames.config'

export async function WithAuthMiddleware(req: NextRequest) {
  const currentPathname = req.nextUrl.pathname
  const requiresAuth = protectedRoutes.some((route) =>
    currentPathname.startsWith(route)
  )

  if (requiresAuth) {    
    const token = await getToken({ req, secret: process.env.AUTH_SECRET })
    const { AUTHENTICATION, SYSTEM } = PATHNAMES

    if (!isPublicRoute(currentPathname) && !token) {
      return NextResponse.redirect(new URL(AUTHENTICATION, req.url))
    }

    if (isPublicRoute(currentPathname) && token) {
      return NextResponse.redirect(new URL(SYSTEM, req.url))
    }
  }

  return null
}
