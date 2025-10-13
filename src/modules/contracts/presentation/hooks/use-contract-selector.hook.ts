'use client'

import { useEffect, useState } from 'react'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import { useContractStore } from '../stores/contract.store'

export function useContractSelector(
  contractId: ContractEntity['id'],
  contracts: ContractEntity[]
) {
  const [open, setOpen] = useState(false)
  const { contract, setContract } = useContractStore()

  useEffect(() => {
    if (!contractId || !contracts.length) return

    const found = contracts.find((co) =>co.id === contractId)
    if (found && found.id !== contract?.id) {
      setContract(found)
    }
  }, [contractId, contracts, setContract, contract?.id])

  return {
    open,
    setOpen,
    contract
  }
}
