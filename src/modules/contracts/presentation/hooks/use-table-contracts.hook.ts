'use client'

import { useEffect, useState } from 'react'
import type { ContractEntity } from '../../domain/entities/contract.entity'
import { useContractStore } from '../stores/contract.store'

export interface UseTableContractsResult {
  contracts: ContractEntity[]
  loading: boolean
}

export function useTableContracts(): UseTableContractsResult {
  const { contracts, getContracts } = useContractStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContract = async () => {
      setLoading(true)
      await getContracts()
      setLoading(false)
    }
    fetchContract()
  }, [])

  return { contracts, loading }
}
