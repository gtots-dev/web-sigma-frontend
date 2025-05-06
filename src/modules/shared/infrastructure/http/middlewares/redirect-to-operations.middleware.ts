import { NextResponse, type NextRequest } from 'next/server'
import { PATHNAMES } from '../../config/pathnames.config'

export async function RedirectToOperationsMiddleware(
  req: NextRequest
) {
  const currentPathname = req.nextUrl.pathname
  const { SYSTEM, OPERATIONS } = PATHNAMES

  if (currentPathname === SYSTEM) {
    return NextResponse.redirect(new URL(OPERATIONS, req.url))
  }

  return null
}
