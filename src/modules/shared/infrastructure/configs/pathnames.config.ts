export interface PathnamesInterface {
  AUTHENTICATION: string
  SYSTEM: string
  OPERATIONS: string
  OPERATION_OPTIONS: (id: number) => string
  OPERATION_CONFIGURATIONS: (id: number) => string
  CONTRACTS: (id: number) => string
  USERS: (id: number) => string
  PERMISSIONS: (id: number) => string
  ACTIVITY_REPORT: (id: number) => string
  CONTRACTS_OPTIONS: (operationId: number, contractId: number) => string
  CONTRACTS_CONFIGURATIONS: (operationId: number, contractId: number) => string
  PROCESSING_UNITS: (operationId: number, contractId: number) => string
  POINTS: (operationId: number, contractId: number) => string
  GROUPS: (operationId: number, contractId: number) => string
  TRAFFIC_FLOW: (operationId: number, contractId: number) => string
  VEHICLES: (operationId: number, contractId: number) => string
  LANES: (
    operationId: number,
    contractId: number,
    processingUnitId: number
  ) => string
}

export const PATHNAMES: PathnamesInterface = {
  AUTHENTICATION: '/authentication',
  SYSTEM: '/system',
  OPERATIONS: '/system/operations',
  OPERATION_OPTIONS: (id) => `/system/operations/${id}/operation-options`,
  ACTIVITY_REPORT: (id) =>
    `/system/operations/${id}/operation-options/activity-report`,
  OPERATION_CONFIGURATIONS: (id) => `/system/operations/${id}/configurations`,
  USERS: (id) => `/system/operations/${id}/configurations/users`,
  PERMISSIONS: (id) => `/system/operations/${id}/configurations/permissions`,
  CONTRACTS: (id) => `/system/operations/${id}/operation-options/contracts`,
  CONTRACTS_OPTIONS: (operationId, contractId) =>
    `/system/operations/${operationId}/operation-options/contracts/${contractId}/contract-options`,
  CONTRACTS_CONFIGURATIONS: (operationId, contractId) =>
    `/system/operations/${operationId}/operation-options/contracts/${contractId}/configurations`,
  PROCESSING_UNITS: (operationId, contractId) =>
    `/system/operations/${operationId}/operation-options/contracts/${contractId}/configurations/processing-units`,
  POINTS: (operationId, contractId) =>
    `/system/operations/${operationId}/operation-options/contracts/${contractId}/configurations/points`,
  GROUPS: (operationId, contractId) =>
    `/system/operations/${operationId}/operation-options/contracts/${contractId}/configurations/groups`,
  LANES: (operationId, contractId, processingUnitId) =>
    `/system/operations/${operationId}/operation-options/contracts/${contractId}/configurations/processing-units/${processingUnitId}/lanes`,
  TRAFFIC_FLOW: (operationId, contractId) =>
    `/system/operations/${operationId}/operation-options/contracts/${contractId}/contract-options/traffic-flow`,
  VEHICLES: (operationId, contractId) =>
    `/system/operations/${operationId}/operation-options/contracts/${contractId}/configurations/vehicles-types`
}

export const publicRoutes: string[] = [PATHNAMES.AUTHENTICATION]

export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.includes(pathname)
}

export function isSelectionOperationRoute(pathname: string): boolean {
  return /^\/system\/operations\/\d+\/(operation-options|configurations|activity-report|contracts|processing-units|points|lanes|users|permissions)/.test(
    pathname
  )
}

export function isSelectionContractRoute(path: string): boolean {
  return /^\/system\/operations\/\d+\/operation-options\/contracts\/.+/.test(
    path
  )
}

export function isSelectionProcessingUnitRoute(path: string): boolean {
  return /^\/system\/operations\/\d+\/operation-options\/contracts\/\d+\/configurations\/processing-units\/.+/.test(
    path
  )
}

export function isProtectedRoute(pathname: string): boolean {
  return (
    pathname.startsWith(PATHNAMES.SYSTEM) ||
    pathname.startsWith(PATHNAMES.OPERATIONS) ||
    isSelectionOperationRoute(pathname)
  )
}
