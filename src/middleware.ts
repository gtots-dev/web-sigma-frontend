import { NextResponse, type NextRequest } from 'next/server'
import { middlewares } from './modules/shared/infrastructure/http/middlewares'

export async function middleware(req: NextRequest) {
  const authResponse = await middlewares.auth(req)
  if (authResponse) return authResponse
  const operationsResponse = await middlewares.operations(req)
  if (operationsResponse) return operationsResponse

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
