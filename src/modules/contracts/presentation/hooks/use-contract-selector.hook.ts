'use client'

import { useEffect } from 'react'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import { useContractStore } from '../stores/contract.store'

export function useContractSelector(
  contractId: ContractEntity['id'],
  contracts: ContractEntity[]
) {
  const { contract, setContract, setContracts } = useContractStore()

  useEffect(() => {
    if (!contracts?.length) return
    setContracts(contracts)

    if (!contractId) return
    const found = contracts.find((co) => String(co.id) === String(contractId))
    if (found) {
      setContract(found)
    }
  }, [contractId, contracts, setContract, setContracts])

  return {
    contract
  }
}
