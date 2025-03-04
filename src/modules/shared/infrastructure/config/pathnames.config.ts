interface PathnamesInterface {
  AUTHENTICATION: string
  SYSTEM: string
}

export const PATHNAMES: PathnamesInterface = {
  AUTHENTICATION: process.env.AUTHENTICATION_ROUTE_PATH,
  SYSTEM: process.env.SYSTEM_ROUTE_PATH
}

export const publicRoutes: Array<string> = [PATHNAMES.AUTHENTICATION]
export const privateRoutes: Array<string> = [PATHNAMES.SYSTEM]
export const protectedRoutes: Array<string> = [
  PATHNAMES.AUTHENTICATION,
  PATHNAMES.SYSTEM
]

export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.includes(pathname)
}
