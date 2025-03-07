interface PathnamesInterface {
  AUTHENTICATION: string
  SYSTEM: string
  OPERATIONS: string
  CONTRACTS: string
  PROCESSING_UNITS: string
  LANES: string
  POINTS: string
  OPERATORS: string
  USERS: string
  PERMISSIONS: string
}

export const PATHNAMES: PathnamesInterface = {
  AUTHENTICATION: '/authentication',
  SYSTEM: '/system',
  OPERATIONS: '/system/operations',
  CONTRACTS: '/system/operations/contracts',
  PROCESSING_UNITS: '/system/operations/contracts/processing-units',
  POINTS: '/system/operations/contracts/points',
  OPERATORS: '/system/operations/contracts/operators',
  LANES: '/system/operations/contracts/processing-units/lanes',
  USERS: '/system/operations/users',
  PERMISSIONS: '/system/operations/permissions',
}

export const publicRoutes: Array<string> = [PATHNAMES.AUTHENTICATION]
export const privateRoutes: Array<string> = [
  PATHNAMES.SYSTEM,
  PATHNAMES.OPERATIONS,
  PATHNAMES.CONTRACTS,
  PATHNAMES.PROCESSING_UNITS,
  PATHNAMES.LANES,
  PATHNAMES.POINTS,
  PATHNAMES.OPERATORS,
  PATHNAMES.USERS,
  PATHNAMES.PERMISSIONS
]
export const protectedRoutes: Array<string> = [
  PATHNAMES.AUTHENTICATION,
  PATHNAMES.SYSTEM,
  PATHNAMES.OPERATIONS,
  PATHNAMES.CONTRACTS,
  PATHNAMES.PROCESSING_UNITS,
  PATHNAMES.LANES,
  PATHNAMES.POINTS,
  PATHNAMES.OPERATORS,
  PATHNAMES.USERS,
  PATHNAMES.PERMISSIONS
]

export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.includes(pathname)
}
