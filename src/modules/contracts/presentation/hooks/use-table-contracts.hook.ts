'use client'

import { useEffect, useState, useCallback } from 'react'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import { useContractStore } from '../stores/contract.store'

export interface UseTableContractsResult {
  contracts: ContractEntity[]
  loading: boolean
}

export function useTableContracts(): UseTableContractsResult {
  const { contracts, getContracts: getContractsFromStore } = useContractStore()
  const [loading, setLoading] = useState(true)

  const getContracts = useCallback(async () => {
    setLoading(true)
    await getContractsFromStore()
    setLoading(false)
  }, [getContractsFromStore])

  useEffect(() => {
    getContracts()
  }, [getContracts])

  return { contracts, loading }
}
