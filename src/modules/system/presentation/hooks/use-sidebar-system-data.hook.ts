'use client'

import { useMemo } from 'react'
import { getSidebarData } from '@/modules/system/infrastructure/configs/sidebar.config'
import { filterSidebarByPermissions } from '../utils/filter-sidebar-by-permissions.util'
import { useActiveContractWorkspace } from './use-active-contract-workspace.hook'
import type { UserPermissionsInterface } from '@/modules/users/domain/interfaces/user-permissions.interface'

export function useSidebarSystemData(
  permissions: UserPermissionsInterface,
  isAdmin?: boolean
) {
  const { pathname, operationId, activeContractId, processingUnitId } =
    useActiveContractWorkspace()

  const strOperationId = operationId ? String(operationId) : undefined

  const sidebarData = useMemo(() => {
    const rawData = getSidebarData(
      operationId,
      activeContractId,
      processingUnitId
    )
    return isAdmin
      ? rawData
      : filterSidebarByPermissions(rawData, permissions, strOperationId)
  }, [
    operationId,
    activeContractId,
    processingUnitId,
    permissions,
    isAdmin,
    strOperationId
  ])

  return {
    pathname,
    operationId: strOperationId,
    sidebarData
  }
}
