'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { getSidebarData } from '@/modules/system/infrastructure/configs/sidebar.config'
import { extractOperationId } from '../utils/export-operation-id.util'
import { filterSidebarByPermissions } from '../utils/filter-sidebar-by-permissions.util'

export function useSidebarSystemData(permissions: string[]) {
  const pathname = usePathname()
  const [operationId, setOperationId] = useState('')

  useEffect(() => {
    const extractedId = extractOperationId(pathname)
    setOperationId(extractedId)
  }, [pathname])

  const sidebarData = useMemo(() => {
    const rawData = getSidebarData(Number(operationId))
    return filterSidebarByPermissions(rawData, permissions, operationId)
  }, [operationId, permissions])

  return {
    pathname,
    operationId,
    sidebarData
  }
}
