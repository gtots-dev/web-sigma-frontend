'use client'

import { useEffect, useState } from 'react'
import type { ContractEntity } from '../../domain/entities/contract.entity'

export interface UseTableContractsResult {
  contracts: ContractEntity[]
  loading: boolean
}

export function useTableContracts(): UseTableContractsResult {
  const [contracts, setContracts] = useState<ContractEntity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContract = async () => {
      setLoading(true)
      const data: ContractEntity[] = []
      setContracts(data)
      setLoading(false)
    }
    fetchContract()
  }, [])

  return { contracts, loading }
}
