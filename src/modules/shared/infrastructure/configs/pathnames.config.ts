export interface PathnamesInterface {
  AUTHENTICATION: string
  SYSTEM: string
  OPERATIONS: string
  OPERATION_OPTIONS: (id: number) => string
  OPERATION_CONFIGURATIONS: (id: number) => string
  CONTRACTS: (id: number) => string
  PROCESSING_UNITS: (id: number) => string
  POINTS: (id: number) => string
  OPERATORS: (id: number) => string
  LANES: (id: number) => string
  USERS: (id: number) => string
  PERMISSIONS: (id: number) => string
  ACTIVITY_REPORT: (id: number) => string
}

export const PATHNAMES: PathnamesInterface = {
  AUTHENTICATION: '/authentication',
  SYSTEM: '/system',
  OPERATIONS: '/system/operations',
  OPERATION_OPTIONS: (id) => `/system/operations/${id}/operation-options`,
  OPERATION_CONFIGURATIONS: (id) =>
    `/system/operations/${id}/configurations`,
  CONTRACTS: (id) => `/system/operations/${id}/operation-options/contracts`,
  PROCESSING_UNITS: (id) =>
    `/system/operations/${id}/configurations/contracts/processing-units`,
  POINTS: (id) =>
    `/system/operations/${id}/configurations/contracts/points`,
  OPERATORS: (id) =>
    `/system/operations/${id}/configurations/contracts/operators`,
  LANES: (id) =>
    `/system/operations/${id}/configurations/contracts/processing-units/lanes`,
  USERS: (id) => `/system/operations/${id}/configurations/users`,
  PERMISSIONS: (id) =>
    `/system/operations/${id}/configurations/permissions`,
  ACTIVITY_REPORT: (id) =>
    `/system/operations/${id}/operation-options/activity-report`
}

export const publicRoutes: string[] = [PATHNAMES.AUTHENTICATION]

export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.includes(pathname)
}

export function isSelectionOperationRoute(pathname: string): boolean {
  return /^\/system\/operations\/\d+\/(operation-options|configurations|activity-report|contracts|processing-units|points|operators|lanes|users|permissions)/.test(
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
