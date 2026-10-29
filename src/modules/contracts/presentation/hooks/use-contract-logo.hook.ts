'use client'

import { useEffect } from 'react'
import { useContractFileStore } from '../stores/contract-file.store'
import { useActiveContractWorkspace } from '@/modules/system/presentation/hooks/use-active-contract-workspace.hook'

export function useContractLogo() {
  const { logoUrl, loadingLogo, loadContractLogo, setLogoUrl } =
    useContractFileStore()
  const { operationId, activeContractId, hasActiveContract } =
    useActiveContractWorkspace()

  useEffect(() => {
    if (!hasActiveContract || !activeContractId || !operationId) {
      setLogoUrl(null)
      return
    }

    loadContractLogo({
      operationId: String(operationId),
      contractId: String(activeContractId)
    })
  }, [hasActiveContract, activeContractId, operationId, loadContractLogo, setLogoUrl])

  return {
    logoUrl,
    loading: loadingLogo
  }
}
