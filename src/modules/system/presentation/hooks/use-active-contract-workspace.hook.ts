'use client'

import { useParams, usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import {
  isContractWorkspaceRoute,
  isModalRoute
} from '@/modules/shared/infrastructure/configs/pathnames.config'

export interface UseActiveContractWorkspaceResult {
  pathname: string
  operationId?: number
  contractId?: number
  processingUnitId?: number
  activeContractId?: number
  isWorkspaceActive: boolean
  isModalActive: boolean
  hasActiveContract: boolean
}

/**
 * Resolve e gerencia os parâmetros e o contrato ativo na área de trabalho do sistema.
 * Preserva o `activeContractId` mesmo ao abrir modais interceptados sobre a workspace,
 * garantindo que a barra lateral (Sidebar) não resete nem colapse indevidamente.
 */
export function useActiveContractWorkspace(): UseActiveContractWorkspaceResult {
  const pathname = usePathname()
  const params = useParams()

  const operationId = params?.operationId ? Number(params.operationId) : undefined
  const rawContractId = params?.contractId ? Number(params.contractId) : undefined
  const processingUnitId = params?.processingUnitId ? Number(params.processingUnitId) : undefined

  const isWorkspace = isContractWorkspaceRoute(pathname)
  const isModal = isModalRoute(pathname)

  const lastContractIdRef = useRef<number | undefined>(undefined)

  if (isWorkspace && rawContractId) {
    lastContractIdRef.current = rawContractId
  }

  const activeContractId = isWorkspace
    ? rawContractId
    : isModal
      ? (rawContractId ?? lastContractIdRef.current)
      : undefined

  useEffect(() => {
    if (!isWorkspace && !isModal) {
      lastContractIdRef.current = undefined
    }
  }, [isWorkspace, isModal])

  return {
    pathname,
    operationId,
    contractId: rawContractId,
    processingUnitId,
    activeContractId,
    isWorkspaceActive: isWorkspace,
    isModalActive: isModal,
    hasActiveContract: Boolean(activeContractId)
  }
}
