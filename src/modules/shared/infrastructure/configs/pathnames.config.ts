interface PathnamesInterface {
  AUTHENTICATION: string
  SYSTEM: string
  OPERATIONS: string
  CONTRACTS: string
  CONTRACT_OPTIONS: string
  PROCESSING_UNITS: string
  LANES: string
  POINTS: string
  OPERATORS: string
  OPERATION_OPTIONS: string
  USERS: string
  PERMISSIONS: string
}

export const PATHNAMES: PathnamesInterface = {
  AUTHENTICATION: '/authentication',
  SYSTEM: '/system',
  OPERATIONS: '/system/operations',
  OPERATION_OPTIONS: '/system/operations/operation-options',
  CONTRACTS: '/system/operations/contracts',
  CONTRACT_OPTIONS: '/system/operations/contracts/contract-options',
  PROCESSING_UNITS: '/system/operations/contracts/processing-units',
  POINTS: '/system/operations/contracts/points',
  OPERATORS: '/system/operations/contracts/operators',
  LANES: '/system/operations/contracts/processing-units/lanes',
  USERS: '/system/operations/users',
  PERMISSIONS: '/system/operations/permissions'
}

export const publicRoutes: Array<string> = [PATHNAMES.AUTHENTICATION]
export const privateRoutes: Array<string> = [
  PATHNAMES.SYSTEM,
  PATHNAMES.OPERATIONS,
  PATHNAMES.CONTRACTS,
  PATHNAMES.CONTRACT_OPTIONS,
  PATHNAMES.PROCESSING_UNITS,
  PATHNAMES.OPERATION_OPTIONS,
  PATHNAMES.LANES,
  PATHNAMES.POINTS,
  PATHNAMES.OPERATORS,
  PATHNAMES.USERS,
  PATHNAMES.PERMISSIONS
]
export const protectedRoutes: Array<string> = [
  PATHNAMES.SYSTEM,
  PATHNAMES.OPERATIONS,
  PATHNAMES.CONTRACTS,
  PATHNAMES.PROCESSING_UNITS,
  PATHNAMES.OPERATION_OPTIONS,
  PATHNAMES.CONTRACT_OPTIONS,
  PATHNAMES.LANES,
  PATHNAMES.POINTS,
  PATHNAMES.OPERATORS,
  PATHNAMES.USERS,
  PATHNAMES.PERMISSIONS
]

export const selectionOperationRoutes: Array<string> = [
  PATHNAMES.CONTRACTS,
  PATHNAMES.PROCESSING_UNITS,
  PATHNAMES.OPERATION_OPTIONS,
  PATHNAMES.LANES,
  PATHNAMES.POINTS,
  PATHNAMES.OPERATORS,
  PATHNAMES.USERS,
  PATHNAMES.PERMISSIONS
]

export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.includes(pathname)
}

export function isSelectionOperationRoutes(pathname: string): boolean {
  return selectionOperationRoutes.includes(pathname)
}
