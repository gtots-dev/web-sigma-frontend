'use client'

import { usePatchContractMenuContext } from '../contexts/patch-contract-menu.context'

export function usePatchContractMenuTrigger() {
  const { open } = usePatchContractMenuContext()

  const loadUserPatchContractOpenDialog = () => open()

  return { loadUserPatchContractOpenDialog }
}
