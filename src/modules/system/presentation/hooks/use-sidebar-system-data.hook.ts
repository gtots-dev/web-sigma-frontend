'use client'

import { useParams, usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { getSidebarData } from '@/modules/system/infrastructure/configs/sidebar.config'
import { filterSidebarByPermissions } from '../utils/filter-sidebar-by-permissions.util'
import type { UserPermissionsInterface } from '@/modules/users/domain/interfaces/user-permissions.interface'

export function useSidebarSystemData(
  permissions: UserPermissionsInterface,
  isAdmin?: boolean
) {
  const pathname = usePathname()
  const {
    operationId,
    contractId,
    processingUnitId
  }: { operationId: string; contractId: string; processingUnitId: string } =
    useParams()

  const sidebarData = useMemo(() => {
    const rawData = getSidebarData(
      Number(operationId),
      Number(contractId),
      Number(processingUnitId)
    )
    return isAdmin
      ? rawData
      : filterSidebarByPermissions(rawData, permissions, operationId)
  }, [operationId, contractId, processingUnitId, permissions, isAdmin])

  return {
    pathname,
    operationId,
    sidebarData
  }
}
