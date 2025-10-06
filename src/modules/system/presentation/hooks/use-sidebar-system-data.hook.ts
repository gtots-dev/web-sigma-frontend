'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { getSidebarData } from '@/modules/system/infrastructure/configs/sidebar.config'
import { extractOperationId } from '../utils/export-operation-id.util'
import { filterSidebarByPermissions } from '../utils/filter-sidebar-by-permissions.util'
import type { UserPermissionsInterface } from '@/modules/users/domain/interfaces/user-permissions.interface'

export function useSidebarSystemData(
  permissions: UserPermissionsInterface,
  isAdmin?: boolean
) {
  const pathname = usePathname()
  const operationId = useMemo(() => extractOperationId(pathname), [pathname])

  const sidebarData = useMemo(() => {
    const rawData = getSidebarData(Number(operationId))
    return isAdmin
      ? rawData
      : filterSidebarByPermissions(rawData, permissions, operationId)
  }, [operationId, permissions, isAdmin])

  return {
    pathname,
    operationId,
    sidebarData
  }
}
