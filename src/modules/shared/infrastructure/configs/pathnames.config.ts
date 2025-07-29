export interface PathnamesInterface {
  AUTHENTICATION: string
  SYSTEM: string
  OPERATIONS: string
  OPERATION_OPTIONS: (id: number) => string
  CONTRACTS: (id: number) => string
  PROCESSING_UNITS: (id: number) => string
  POINTS: (id: number) => string
  OPERATORS: (id: number) => string
  LANES: (id: number) => string
  USERS: (id: number) => string
  PERMISSIONS: (id: number) => string
}

export const PATHNAMES: PathnamesInterface = {
  AUTHENTICATION: '/authentication',
  SYSTEM: '/system',
  OPERATIONS: '/system/operations',
  OPERATION_OPTIONS: (id) => `/system/operations/${id}/operation-options`,
  CONTRACTS: (id) => `/system/operations/${id}/contracts`,
  PROCESSING_UNITS: (id) =>
    `/system/operations/${id}/contracts/processing-units`,
  POINTS: (id) => `/system/operations/${id}/contracts/points`,
  OPERATORS: (id) => `/system/operations/${id}/contracts/operators`,
  LANES: (id) => `/system/operations/${id}/contracts/processing-units/lanes`,
  USERS: (id) => `/system/operations/${id}/users`,
  PERMISSIONS: (id) => `/system/operations/${id}/permissions`
}

export const publicRoutes: string[] = [PATHNAMES.AUTHENTICATION]

export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.includes(pathname)
}

export function isSelectionOperationRoute(pathname: string): boolean {
  return /^\/system\/operations\/\d+\/(operation-options|contracts|processing-units|points|operators|lanes|users|permissions)/.test(
    pathname
  )
}

export function isProtectedRoute(pathname: string): boolean {
  return (
    pathname.startsWith(PATHNAMES.SYSTEM) ||
    pathname.startsWith(PATHNAMES.OPERATIONS) ||
    isSelectionOperationRoute(pathname)
  )
}
